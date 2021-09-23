/* eslint-disable no-console, @typescript-eslint/no-explicit-any */

export function loadState(key: string) {
  if (typeof window === 'undefined') return;
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export function saveState(key: string, state: any) {
  try {
    if (typeof window === 'undefined') return;
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.log(error);
    return error;
  }
}

export function removeState({
  items,
  key,
}: {
  items?: string[];
  key?: string;
}) {
  try {
    if (items) items.forEach((item) => localStorage.removeItem(item));
    else if (key) localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
}

export function clearState() {
  try {
    localStorage.clear();
  } catch (error) {
    console.log(error);
  }
}
