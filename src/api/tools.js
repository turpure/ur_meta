export function compareUp(data, propertyName) { // 升序排序
  if ((typeof Number(data[0][propertyName])) !== 'number') { // 属性值为非数字
    return function(object1, object2) {
      var value1 = object1[propertyName]
      var value2 = object2[propertyName]
      return value2.localeCompare(value1)
    }
  } else {
    return function(object1, object2) { // 属性值为数字
      var value1 = object1[propertyName]
      var value2 = object2[propertyName]
      return value1 - value2
    }
  }
}
export function compareDown(data, propertyName) { // 降序排序
  if ((typeof Number(data[0][propertyName])) !== 'number') { // 属性值为非数字
    return function(object1, object2) {
      var value1 = object1[propertyName]
      var value2 = object2[propertyName]
      return value2.localeCompare(value1)
    }
  } else {
    return function(object1, object2) { // 属性值为数字
      var value1 = object1[propertyName]
      var value2 = object2[propertyName]
      return value2 - value1
    }
  }
}
