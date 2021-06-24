import selectors from '../support/selectors.js';  // import all DOM selectors for testing purposes

describe('Test if all elements are present on home page', () => {
    before(() => {
        cy.clearCookies()
        cy.visit('/')
        cy.wait(1000)
    })
    it('Check if Logo link is present', () => {
        cy.get(selectors.headerLogo).should('be.visible')
    })
    it('Check if notification is present and stylized', () => {
        cy.get(selectors.hpNotification).should('be.visible')
        cy.get(selectors.hpNotification).should('have.css', 'background-color').and('eq', 'rgb(167, 199, 231)')
        cy.get(selectors.hpNotificationLink).should('be.visible')
        cy.get(selectors.hpNotificationClose).should('be.visible')
        cy.get(selectors.hpNotificationIcon).should('be.visible')
        cy.get(selectors.hpNotificationText).should('be.visible')
    })
})

describe('Test if notification can be closed', () => {
    before(() => {
        cy.clearCookies()
        cy.visit('/')
        cy.wait(1000)
    })
    it('Click on notification close button', () => {
        cy.get(selectors.hpNotificationClose).click()
    })
    it('Check if notification is removed once closed', () => {
        cy.get(selectors.hpNotification).should('not.be.visible')
    })
})

describe('Test if more info leads to notifications page ', () => {
    before(() => {        
        cy.clearCookies()
        cy.visit('/')
        cy.wait(1000)
    })
    it('Click on more info', () => {
        cy.get(selectors.hpNotificationLink).click()
    })
    it('Check if you are on notifications page', () => {
        cy.url().should('include', '/notifications')
    })
    it('Check if there is (at least) one unread notification present', () => {
        cy.get(selectors.notifPagePanelHeaderNotRead).should('be.visible')
        cy.get(selectors.notifPagePanelHeaderStatusIcon).should('be.visible')
    })
})

