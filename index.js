const cron = require('node-cron')
const fs = require('fs')
const path = require('path')
let taskList = []

console.log('Task Manager Start: ' + new Date().toISOString())

let tasksPath = path.join(process.cwd(), '/tasks')
let tasks = fs.readdirSync(tasksPath)
for (let task of tasks) {
  let taskName = /([^/\\]+)\.[a-zA-Z]+$/.exec(task)[1]
  taskList.push(taskName)
  let TaskClass = require(path.join(tasksPath, taskName))
  let taskInstance = new TaskClass()
  if (!taskInstance.cycleStr || !taskInstance.job) {
    throw new Error('task must have cycleStr property && job function: ' + path.join(tasksPath, taskName))
  }
  cron.schedule(taskInstance.cycleStr, taskInstance.job)
}

console.log('Following Tasks is Running: ')
console.log(taskList)
