'use strict'

const puppeteer = require('puppeteer')

const state = {}

const notifier = require('node-notifier');
// String

setInterval(() => {
    let browserHandle
    let pageHandle

    console.log(state)

    puppeteer
        .launch()
        .then((browser) => browserHandle = browser)
        .then((browser) => browser.newPage())
        .then((page) => pageHandle = page)
        .then((page) => page.goto('https://www.poea.gov.ph/dhclearance/directhires.html'))
        .then(() => pageHandle)
        .then((page) => page.evaluate(() => {
            return [...(document.querySelectorAll('.w3-half > h4:nth-of-type(1)'))].map((x) => x.innerText)
        }))
        .then((result) => {
            if(result[0] && !state[result[0]]) {
                console.log('New manila announcement! ' + result[0])
	              notifier.notify('New manila announcement! ' + result[0])
                state[result[0]] = new Date()
            }
            if(result[1] && !state[result[1]]) state[result[1]] = new Date()
        })
        .then(() => browserHandle.close())
}, 3000)

