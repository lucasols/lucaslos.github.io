import * as PIXI from 'pixi.js';
import store from 'redux/store/configureStore';
import * as actions from 'redux/actions/index';
import bezierEasing from 'bezier-easing';

// remove
import d from 'utils/index';

const SpaceScroll = {
  initialize(canvasContainer) {
    // create Pixi stage and renderer
    this.renderer = PIXI.autoDetectRenderer(
      window.innerWidth, window.innerHeight,
      { antialias: true, transparent: true, resolution: 1 },
    );
    canvasContainer.appendChild(this.renderer.view);
    this.renderer.autoResize = true;
    this.stage = new PIXI.Container();
    // this.renderer.backgroundColor = 0x000e1a;

    // initializes background elements
    this.createBgSpaceElements();

    // define sections props
    this.section = [];

    this.section[0] = {
      delay: 0,
      childShiftLen: 1000,
      parent: document.getElementById('home'),
      childs: document.getElementById('home').querySelectorAll('[data-anim]'),
    };
    this.section[1] = {
      delay: 1000,
      childShiftLen: 1000,
      parent: document.getElementById('about-me'),
      childs: document.getElementById('about-me').querySelectorAll('[data-anim]'),
    };
    this.section[2] = {
      delay: 2000,
      childShiftLen: 1500,
      parent: document.getElementById('works'),
      childs: document.getElementById('works').querySelectorAll('[data-anim]'),
    };
    this.section[3] = {
      delay: 0,
      childShiftLen: 1000,
      parent: document.getElementById('contact'),
      childs: document.getElementById('contact').querySelectorAll('[data-anim]'),
    };

    // defines space scroll props
    // [...section].map(d => d.delay).reduce((a, b) => a + b, 0) sums the delay of all sections
    this.shiftLen = ((document.body.scrollHeight - window.innerHeight) - ([...this.section].map(s => s.delay).reduce((a, b) => a + b, 0))) / 6;
    this.maxZPos = 600;
    this.lastScrollY = null;
    this.lastActiveSection = null;
    this.scrollHandlerElem = document.getElementById('scroll-handler');
    this.animScroll = false;
    this.borderCycleAdjust = 0;
    this.menuProps = {
      elem: document.getElementById('menu'),
      pos: (this.shiftLen / 2) + this.section[0].delay,
      visibility: true,
    };

    // works section interval props
    this.numOfProjects = document.getElementById('works').querySelectorAll('.project-image').length;
    this.lastActiveProject = 0;

    // validate delay properties
    if (this.shiftLen <= 0) throw Error('The sum of sections delay can not be higher than scrollable area height');

    // calculates the scroll props based section props
    for (let i = 0, len = this.section.length; i < len; i++) {
      const sectionOrder = i + 1;

      this.section[i].shiftStages = (sectionOrder === 1 || sectionOrder === len) ? 1 : 2;
      this.section[i].maxOrder = Math.max(...[...this.section[i].childs].map(c => c.getAttribute('data-anim')));
      this.section[i].pos = (i === 0) ? 0 : (this.section[i - 1].pos + this.section[i - 1].delay + (this.shiftLen * this.section[i - 1].shiftStages));
    }

    // add resize event listener
    window.addEventListener('resize', this.resizeWindow.bind(this));

    // bind the loop for requestAnimationFrame
    this.loop = this.loop.bind(this);

    // bound actions creator
    this.setActiveSection = sectionId => store.dispatch(actions.setAciveSection(sectionId));
    this.setActiveProject = projectId => store.dispatch(actions.setActiveProject(projectId));

    // trigger render loop
    this.loop();
  },

  // render loop
  loop() {
    let scrollY;

    // handles scroll animations
    // REVIEW: and if two animantions happen at same time?
    if (this.animScroll !== false) {
      const remaining = this.animScroll.end - Date.now();

      // animate
      if (remaining > 1000 / 60) {
        const rate = 1 - (remaining / this.animScroll.duration);
        const easingRate = this.animScroll.easing(rate);

        scrollY = this.animScroll.from + ((this.animScroll.to - this.animScroll.from) * easingRate);

        // end animation
      } else {
        // cache absoluteTargetPos
        // const absoluteTargetPos = this.animScroll.absoluteTargetPos;

        // avoid changes of scroll of users in transition
        scroll(0, this.animScroll.absoluteTargetPos);

        // disable anim controllers
        scrollY = this.animScroll.absoluteTargetPos;
        this.animScroll = false;

        // readjus the space borders cycle
        this.borderCycleAdjust += scrollY - this.lastScrollY;
      }
    } else {
      scrollY = window.pageYOffset;
    }

    if (this.lastScrollY !== scrollY) {
      this.handleBackgroungBordersProp(scrollY - this.borderCycleAdjust);
      this.handleSpaceElementsProps(scrollY);
      this.handleMenuVisibility(scrollY);
      this.lastScrollY = scrollY;
    }

    this.renderer.render(this.stage);

    this.frame = requestAnimationFrame(this.loop);
  },

  // change active section
  // TODO: click between section trigger scroll to nearest
  // TODO: avoid scroll with from == to scroll pos
  // TODO: add a timeOut for back to an active pos
  scrollToSection(targetSection) {
    const absoluteTargetPos = (targetSection === 0) ? 0 : this.section[targetSection].pos + this.shiftLen;
    const currentSection = this.lastActiveSection;
    const scrollY = window.pageYOffset;
    const direction = Math.sign(absoluteTargetPos - scrollY);

    // generate a array with changed properties for sections transition
    // TODO: test a simplest approach
    const scrollSections = this.section.map((section, i) => {
      const newProps = Object.assign({}, section);

      // align the pos of target section in sequence of the transition
      if (i === targetSection && targetSection !== currentSection) {
        const delay = (currentSection === 2 && direction === 1) ? this.section[2].delay : 0;
        const shiftStages = (direction === -1) ? section.shiftStages : this.section[currentSection].shiftStages;

        newProps.pos = this.section[currentSection].pos + (direction * shiftStages * this.shiftLen) + delay;
        newProps.delay = 0;
        newProps.pos += (scrollY > this.section[currentSection].pos + this.shiftLen + this.section[currentSection].delay && currentSection !== 2) ? this.section[currentSection].delay : 0;

      // change the props of current section
      } else if (i === currentSection) {
        newProps.delay = (i === 2) ? section.delay : 0;
        newProps.pos = (scrollY > section.pos + this.shiftLen + section.delay && currentSection !== 2) ? section.pos + section.delay : section.pos;

      // move out of scroll range the remaining sections
      } else {
        newProps.pos = document.body.scrollHeight;
        newProps.delay = 0;
      }

      return newProps;
    });

    // max duration of the transition in ms
    const maxDuration = 2400;

    const maxInterval = (targetSection === 2 || (currentSection === 2 && direction === -1 && scrollY < this.section[2].pos + this.shiftLen)) ? this.shiftLen * 3 : (this.shiftLen * 3) + scrollSections[2].delay;

    const relativeTargetPos = Math.ceil((targetSection === 0) ? scrollSections[targetSection].pos : scrollSections[targetSection].pos + this.shiftLen);
    const duration = Math.abs((relativeTargetPos - scrollY) / maxInterval * maxDuration);

    // const relativeDuration = scrollInterval / (this.shiftLen * 3);

    if (duration > maxDuration) throw Error('Error on calculation of transition duration');

    this.animScroll = {
      from: scrollY,
      to: relativeTargetPos,
      absoluteTargetPos: Math.ceil(absoluteTargetPos),
      easing: bezierEasing(0.0, 0.0, 0.2, 1),
      section: scrollSections,
      duration,
      end: Date.now() + duration,
    };

    scroll(0, absoluteTargetPos);
  },

  // re-render space elements based on screen dimensions
  resizeWindow() {
    this.renderer.resize(window.innerWidth, window.innerHeight);

    // remove all childs
    for (let i = 0; i < this.numOfBorders; i++) {
      this.border[i].destroy(true);
    }

    this.starLayer[0].destroy(true);
    this.starLayer[1].destroy(true);
    this.starLayer[2].destroy(true);

    this.lastScrollY = null;

    // recreates elements
    this.createBgSpaceElements();
  },

  // create elements
  createBgSpaceElements() {
    this.numOfStarLayers = 3;
    this.numOfBorders = 6;

    this.starLayer = [];

    this.starLayer[0] = this.drawStarLayer();
    this.starLayer[1] = this.drawStarLayer();
    this.starLayer[2] = this.drawStarLayer();

    this.border = [];

    for (let i = 0; i < this.numOfBorders; i++) {
      this.border[i] = this.drawBorder();
    }
  },

  // return borders in tridimensional space
  drawBorder() {
    const rect = new PIXI.Graphics();

    rect.lineStyle(2, 0x3dd5fc, 1);
    rect.drawRect(0, 0, this.renderer.width - 22, this.renderer.height - 22, 1);

    this.stage.addChild(rect);

    return rect;
  },

  // render star layers
  drawStarLayer() {
    const layer = new PIXI.particles.ParticleContainer();
    const stars = 90;
    // star size for render texture
    const size = 32;

    // base multiplier for calc layer size
    const layerMultiplier = 2;

    const star = new PIXI.Graphics();
    star.beginFill(0xffffff);
    star.drawCircle(size, size, size);
    star.endFill();

    const texture = this.renderer.generateTexture(star);
    this.starLayerWidth = this.renderer.width * layerMultiplier;
    this.starLayerHeight = this.renderer.height * layerMultiplier;

    // create starfield
    for (let i = 0; i < stars; i++) {
      const p = new PIXI.Sprite(texture);

      p.x = Math.random() * this.starLayerWidth;
      p.y = Math.random() * this.starLayerHeight;
      p.scale.x = p.scale.y = ((0.7 * 1) / (size / 2)) + ((Math.random() * 0.6 * 1) / (size / 2));

      layer.addChild(p);
    }

    this.stage.addChild(layer);

    return layer;
  },

  // calculate border props
  // FIXME: bug borders disapearing
  calcBordersProjection(elem, scrollY, cycle) {
    const startRange = 100;
    const endRange = -160;
    const perspective = 600;

    // moves the position for match @initialPos
    const pos = scrollY + (cycle * ((0 - startRange) / (endRange - startRange)));
    // sawtooth function with period of @cycle in the range @startRange to @endRange
    const zTranslateCycle = startRange + ((endRange - startRange) * ((pos / cycle) - ((pos / cycle) | 0)));
    // perspective calc function
    const transformedWidth = this.starLayerWidth * (perspective / (perspective - zTranslateCycle));

    const scale = transformedWidth / this.starLayerWidth;

    elem.x = (((scale - 1) * this.renderer.width) - (22 * scale)) / -2;
    elem.y = (((scale - 1) * this.renderer.height) - (22 * scale)) / -2;
    elem.scale.x = elem.scale.y = scale;
    elem.alpha = (zTranslateCycle - endRange) / (0 - endRange);
  },

  // calculate star layer props
  calcStarLayerProjection(elem, scrollY, initialPos, cycle) {
    const startRange = 599;
    const endRange = -800;
    const perspective = 600;

    // moves the position for match @initialPos
    const pos = scrollY + (cycle * ((initialPos - startRange) / (endRange - startRange)));
    // sawtooth function with period of @cycle in the range @startRange to @endRange
    const zTranslateCycle = startRange + ((endRange - startRange) * ((pos / cycle) - ((pos / cycle) | 0)));
    // perspective calc function
    const transformedWidth = this.starLayerWidth * (perspective / (perspective - zTranslateCycle));

    const scale = transformedWidth / this.starLayerWidth;

    elem.x = (this.renderer.width - (this.starLayerWidth * scale)) / 2;
    elem.y = (this.renderer.height - (this.starLayerHeight * scale)) / 2;
    elem.scale.x = elem.scale.y = scale;
    elem.alpha = (zTranslateCycle >= -100) ? 0.8 : ((zTranslateCycle - endRange) / (-100 - endRange)) * 0.8;
  },

  // handle background elements position and opacity
  handleBackgroungBordersProp(scrollY) {
    const cycle = this.shiftLen;

    for (let i = 0; i < this.numOfBorders; i++) {
      this.calcBordersProjection(this.border[i], scrollY + ((cycle / this.numOfBorders) * i), cycle);
    }
  },

  // handle sections visibility and space elements position and opacity
  handleSpaceElementsProps(scrollY) {
    for (let i = 0, len = this.section.length; i < len; i++) {
      // correct the check of last section end position
      const addPosToEnd = (i === len - 1) ? 1 : 0;

      // change section
      const section = (this.animScroll === false) ? this.section[i] : this.animScroll.section[i];

      // test if section is active
      if (scrollY >= section.pos && scrollY < (addPosToEnd + section.pos + section.delay + (section.shiftStages * this.shiftLen))) {
        // handles the change of sections
        if (this.lastActiveSection !== i) {
          section.parent.style.display = 'block';

          // updates the active section
          this.setActiveSection(i);

          // hide last active section
          if (this.lastActiveSection !== null) this.section[this.lastActiveSection].parent.style.display = '';

          this.lastActiveSection = i;
        }

        // check the direction of transition
        const moveOut = scrollY > (section.pos + this.shiftLen) || i === 0;

        // normalize scrollPos for further calc
        let scrollPos = scrollY - section.pos;

        if (moveOut) {
          // reset the scrollPos for leaving movement
          scrollPos = (i === 0) ? scrollPos - section.delay : scrollPos - this.shiftLen - section.delay;
        }

        // TODO: avoid unnecessary changes of style
        // readjust the zindex of layers for avoid wrong overlaps
        if (moveOut && scrollPos > this.shiftLen * 0.4) {
          section.parent.style.zIndex = -1;
          this.scrollHandlerElem.style.zIndex = 1;
        } else {
          section.parent.style.zIndex = '';
          this.scrollHandlerElem.style.zIndex = '';
        }

        // calc the stars layout properties
        const starsScrollCycle = this.shiftLen * 2 * 0.70;
        const starsScrollPos = (moveOut) ? scrollPos : scrollPos + this.shiftLen;

        if (scrollPos > 0 && starsScrollPos < starsScrollCycle) {
          this.calcStarLayerProjection(this.starLayer[0], starsScrollPos, -50, starsScrollCycle);
          this.calcStarLayerProjection(this.starLayer[1], starsScrollPos, (-50 + -450) / 2, starsScrollCycle);
          this.calcStarLayerProjection(this.starLayer[2], starsScrollPos, -450, starsScrollCycle);
        } else {
          this.calcStarLayerProjection(this.starLayer[0], 0, -50, 10);
          this.calcStarLayerProjection(this.starLayer[1], 0, (-50 + -450) / 2, 10);
          this.calcStarLayerProjection(this.starLayer[2], 0, -450, 10);
        }

        // handles the active project in the works section
        if (i === 2 && scrollPos < 0) {
          // << bitwise floor
          const activeProject = (((section.delay + scrollPos) / section.delay) * this.numOfProjects) << 0;

          if (activeProject !== this.lastActiveProject) {
            if (this.lastActiveProject !== false) this.setActiveProject(activeProject);

            this.lastActiveProject = activeProject;
          }
        }

        // calc the elements properties
        for (let c = 0, lenC = section.childs.length; c < lenC; c++) {
          // calc the start positon for the element transition
          const initalPos = (this.shiftLen - section.childShiftLen) / (section.maxOrder - 1) * (section.childs[c].getAttribute('data-anim') - 1);

          if (scrollPos > initalPos) {
            if (scrollPos <= initalPos + section.childShiftLen) {
              const relPos = (scrollPos - initalPos) / section.childShiftLen;
              const zPos = (moveOut) ? -relPos * this.maxZPos : (1 - relPos) * this.maxZPos;

              // TODO: check performance of direct change of style vs class changes
              section.childs[c].style.transform = `translate3d(0,0, ${zPos}px)`;
              section.childs[c].style.opacity = (moveOut) ? (1 - relPos) : relPos;
              section.childs[c].style.transition = 'none';
              section.childs[c].style.pointerEvents = 'none';
            } else {
              section.childs[c].style.transform = (moveOut) ? 'translate3d(0,0,-600px)' : 'translate3d(0,0,0)';
              section.childs[c].style.opacity = (moveOut) ? 0 : 1;
              section.childs[c].style.transition = (moveOut) ? 'none' : '';
              section.childs[c].style.pointerEvents = (moveOut) ? 'none' : '';
            }
          } else {
            section.childs[c].style.transform = (moveOut) ? 'translate3d(0,0,0)' : 'translate3d(0,0,600px)';
            section.childs[c].style.opacity = (moveOut) ? 1 : 0;
            section.childs[c].style.pointerEvents = '';
            section.childs[c].style.transition = '';
          }
        }

        break;
      }
    }
  },

  scrollToProject(projectId) {
    // avoid setActiveProject action dispatch twice
    this.lastActiveProject = false;

    const targetPos = Math.ceil(this.section[2].pos + this.shiftLen + (projectId * (this.section[2].delay / this.numOfProjects)));
    scroll(0, targetPos);
  },

  // handle menu visibility
  handleMenuVisibility(scrollY) {
    const transitionLen = 400;
    // ranges of transition of positioning
    const topRange = [-21, 21];
    const rightRange = [-22, 22];

    if (scrollY > this.menuProps.pos) {
      if (scrollY < this.menuProps.pos + transitionLen) {
        const relPos = ((scrollY - this.menuProps.pos) / transitionLen);
        const top = topRange[0] + (relPos * (topRange[1] - topRange[0]));
        const right = rightRange[0] + (relPos * (rightRange[1] - rightRange[0]));

        // TODO: test performance
        // TODO: set a timeout for disable transition prop
        Object.assign(this.menuProps.elem.style, {
          top: `${top}px`,
          right: `${right}px`,
          opacity: relPos,
          transition: 'none',
        });

        if (this.menuProps.visibility !== 'inTransition') this.menuProps.visibility = 'inTransition';
      } else if (this.menuProps.visibility !== true) {
        Object.assign(this.menuProps.elem.style, {
          top: `${topRange[1]}px`,
          right: `${rightRange[1]}px`,
          opacity: 1,
          transition: '',
        });

        this.menuProps.visibility = true;
      }
    } else if (this.menuProps.visibility !== false) {
      Object.assign(this.menuProps.elem.style, {
        top: `${topRange[0]}px`,
        right: `${rightRange[0]}px`,
        opacity: 0,
        transition: '',
      });

      this.menuProps.visibility = false;
    }
  },
};

export default SpaceScroll;
