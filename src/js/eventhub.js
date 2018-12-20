window.eventhub = {
  events: {},
  // 订阅
  emit(eventName, data) {
    for (let key in this.events) {
      if (key === eventName) {
        let fnlist = this.events[key];
        fnlist.map(fn => {
          fn(data);
        });
      }
    }
  },
  // 发布
  on(eventName, fn) {
    if (this.events[eventName] === undefined) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(fn);
  }
};
