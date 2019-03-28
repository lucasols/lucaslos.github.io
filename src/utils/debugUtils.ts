import { obj, genericFunction } from 'typings/utils';
import { throttle, round } from 'lodash-es';
import { watch } from 'fs';

type CheckFunction = (value?: any) => boolean;
type Id = number | string;

const records: obj<{
  values: obj;
  ended: boolean;
  timeoutId: number | undefined;
  start: number;
  checkEnd: CheckFunction | false;
  addValue: (value: any) => void;
}> = {};
const throttleLogs: obj<{
  log: (value: any) => void;
  lastDep: any;
}> = {};
const watchValues: obj<{
  value: string | number | (() => string | number);
  roundPrecision: number;
}> = {};
let watchViewIsInitialized = false;

export function __stopRecord(id: Id) {
  if (__DEV__) {
    if (records[id] && !records[id].ended) {
      records[id].ended = true;
      console.table(records[id].values);
    }
  }
}

export function __recordValuesOverTime(
  id: Id,
  value: any,
  limit = 200,
  triggerCondition?: CheckFunction,
  endCondition?: CheckFunction | number
) {
  if (__DEV__) {
    const record = records[id];

    const onStart = () => {
      if (triggerCondition && !triggerCondition(value)) return;

      if (record) clearTimeout(records[id].timeoutId);

      console.log(`Recording ${id} started`);

      records[id] = {
        values: { 0: value },
        ended: false,
        start: Date.now(),
        timeoutId:
          typeof endCondition === 'number'
            ? window.setTimeout(() => __stopRecord(id), endCondition)
            : undefined,
        checkEnd:
          !endCondition || typeof endCondition === 'number'
            ? false
            : endCondition,
        addValue: throttle(newValue => {
          records[id].values[Date.now() - records[id].start] = newValue;
        }, limit),
      };
    };

    if (record) {
      if (record.ended) {
        onStart();
      } else if (record.checkEnd && record.checkEnd(value)) {
        __stopRecord(id);
      } else {
        record.addValue(value);
      }
    } else {
      onStart();
    }
  }
}

function log(label: Id, value: any) {
  if (typeof value === 'number' || typeof value === 'string') {
    console.warn(`${label}: ${value}`);
  } else {
    console.warn(value);
  }
}

export function __log(
  id: Id,
  value: any,
  dependency = value,
  diffOnly = true,
  throttleLimit = 300
) {
  if (__DEV__) {
    if (throttleLogs[id]) {
      if (diffOnly) {
        if (
          JSON.stringify(throttleLogs[id].lastDep)
          !== JSON.stringify(dependency)
        ) {
          throttleLogs[id].log(value);
          throttleLogs[id].lastDep = dependency;
        }
      } else {
        throttleLogs[id].log(value);
      }
    } else {
      log(id, value);
      throttleLogs[id] = {
        log: throttle(val => {
          log(id, val);
        }, throttleLimit),
        lastDep: dependency,
      };
    }
  }
}

function watchValuesViewTicker() {
  let watchView = document.getElementById('debug-watch-view');

  if (!watchView) {
    const style = document.createElement('style');
    const css = `
      #debug-watch-view {
        position: fixed;
        top: 100px;
        bottom: 8px;
        max-width: 200px;
        height: min-content;
        max-height: 400px;
        z-index: 100;
        padding: 8px;
        border-radius: 4px;
        color: #fff;
        background: rgba(0, 0, 0, 0.4);
        overflow-y: auto;
      }

      #debug-watch-view.hide {
        height: 4px;
        width: 4px;
        overflow: hidden;
      }
    `;
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);

    watchView = document.createElement('div');
    watchView.id = 'debug-watch-view';
    document.body.appendChild(watchView);
    watchView.addEventListener('click', () => watchView!.classList.toggle('hide'));

    watchViewIsInitialized = true;
  }

  const values = Object.entries(watchValues);

  const content = values
    .map(([id, { value, roundPrecision }]) => {
      let showValue = value;

      if (typeof value === 'function') {
        const returnedValue = value();

        showValue =
          typeof returnedValue === 'number'
            ? round(returnedValue, roundPrecision)
            : returnedValue;
      }

      return `${id}: ${showValue}`;
    })
    .join('<br>');

  if (content !== watchView.innerHTML) {
    watchView.innerHTML = content;
  }

  setTimeout(watchValuesViewTicker, 100);
}

export function __watchValue(
  id: Id,
  value: string | number | (() => string | number),
  roundPrecision = 3
) {
  if (__DEV__) {
    if (
      watchValues[id] &&
      (watchValues[id].value === value)
    ) return;

    if (!watchViewIsInitialized) watchValuesViewTicker();

    if (typeof value === 'number') {
      watchValues[id] = {
        value: round(value, roundPrecision),
        roundPrecision,
      };
    } else {
      watchValues[id] = { value, roundPrecision };
    }
  }
}
