#!/usr/bin/env node

const { resolve } = require('path')
const { branch } = require('git-rev')
const { cyan, gray, red, bold } = require('chalk')

const { name: moduleName } = require(resolve(process.cwd(), 'package.json'))
const limit = 63

branch(branchName => {
  const url = `${moduleName}-${branchName}.meteorapp.com`
  const willDeploy = url.length <= limit

  const message = willDeploy
    ? cyan(`😸  ${bold(url)} will live a happy life as a review app`)
    : red(`😱  ${bold(url)} will probably fail to deploy as a review app because its name is over the galaxy limit of ${bold(limit)} characters`)

  const logMethod = willDeploy ? 'info' : 'error'
  console[logMethod](gray(`
    *** Galaxy review apps ***

    ${message}
  `))

  process.exit()
})
