import { obj } from 'typings/utils';
import { throttle } from 'lodash-es';

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
  if (__DEV__) {
    if (typeof value === 'number' || typeof value === 'string') {
      console.warn(`${label}: ${value}`);
    } else {
      console.warn(value);
    }
  }
}

export function __log(id: Id, value: any, dependency = value, diffOnly = true, throttleLimit = 300) {
  if (__DEV__) {
    if (throttleLogs[id]) {
      if (diffOnly) {
        if (JSON.stringify(throttleLogs[id].lastDep) !== JSON.stringify(dependency)) {
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
