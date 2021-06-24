import selectors from '../support/selectors.js';  // import all DOM selectors for testing purposes

describe('Test if all elements are present on notifications page', () => {
    before(() => {
        cy.clearCookies()
        cy.visit('/notifications')
        cy.wait(1000)
    })
    it('Check if Logo link is present', () => {
        cy.get(selectors.headerLogo).should('be.visible')
    })
    it('Check if (at least) one notification is present', () => {
        cy.get(selectors.notifPagePanelHeader).should('be.visible')
        cy.get(selectors.notifPagePanelHeaderDate).should('be.visible')
        cy.get(selectors.notifPagePanelHeaderSummary).should('be.visible')
        cy.get(selectors.notifPagePanelHeaderArrow).should('be.visible')
        cy.get(selectors.notifPagePanelHeaderArrow).should('have.attr', 'style', 'transform: rotate(0deg);');
    })
    it('Check if unread notifications (if there are any) are marked', () => {
        cy.get(selectors.notifPagePanelHeader).then(($panel) => {
            if ($panel.hasClass('emphasized')) {
                cy.get(selectors.notifPagePanelHeaderNotRead).find(selectors.notifPagePanelHeaderStatusIcon).should('exist');
                cy.get(selectors.notifPagePanelHeaderNotRead).find(selectors.notifPagePanelHeaderStatusIcon).should('have.css', 'background-color').and('eq', 'rgb(167, 199, 231)')
            } else {
                cy.get(selectors.notifPagePanelHeaderRead).find(selectors.notifPagePanelHeaderStatusIcon).should('not.exist');
            }
        })
    })
})
describe('Test if you can expand/collapse notifications', () => {
    before(() => {
        cy.clearCookies()
        cy.visit('/notifications')
        cy.wait(1000)
    })
    it('Open and close first panel and check if elements are visible/hidden', () => {
        cy.get(selectors.notifPagePanelHeader).then(($panel) => {
            if ($panel.hasClass('emphasized')) {
                cy.get(selectors.notifPagePanelHeaderNotRead).first().as('panel').click()
            } else {
                cy.get(selectors.notifPagePanelHeaderRead).first().as('panel').click()
            } 
        })
        cy.get('@panel').find(selectors.notifPagePanelHeaderStatusIcon).should('not.exist');
        cy.get('@panel').find(selectors.notifPagePanelHeaderArrow).should('have.attr', 'style', 'transform: rotate(180deg);')
        cy.get('@panel').next().find(selectors.notifPagePanelContentDeleteButton).should('be.visible');
        cy.get('@panel').next().find(selectors.notifPagePanelContentDescription).should('be.visible');
        cy.get('@panel').click()
        cy.get('@panel').find(selectors.notifPagePanelHeaderStatusIcon).should('not.exist');
        cy.get('@panel').find(selectors.notifPagePanelHeaderArrow).should('have.attr', 'style', 'transform: rotate(0deg);')
        cy.get('@panel').next().find(selectors.notifPagePanelContentDeleteButton).should('not.be.visible');
        cy.get('@panel').next().find(selectors.notifPagePanelContentDescription).should('not.be.visible');
    })
})
describe('Test if you can delete a notification', () => {
    before(() => {
        cy.clearCookies()
        cy.visit('/notifications')
        cy.wait(1000)
    })
    it('Open and delete first panel', () => {
        cy.get(selectors.notifPagePanel).first().as("panel").find(selectors.notifPagePanelHeader).click()
        cy.get("@panel").find(selectors.notifPagePanelContentDeleteButton).click()
        cy.get("@panel").should('not.be.visible')
    })
})
describe('Expand all notifications and return to homepage', () => {
    before(() => {
        cy.clearCookies()
        cy.visit('/notifications')
        cy.wait(1000)
    })
    it('Open and close all panels and check if elements are visible/hidden', () => {
        cy.get(selectors.notifPagePanelHeader).each((item) => {
            cy.wrap(item).click()            
        })        
    })
    it('Check if blue circles are gone after opening all notifications', () => {
        cy.get(selectors.notifPagePanelHeaderStatusIcon).should('not.exist');
    })
    it('Check if you can go back to homepage using logo link', () => {
        cy.get(selectors.headerLogo).click()
        cy.url().should('be.equal', Cypress.config().baseUrl)
    })
    it('Check if notification on home page is not present', () => {
        cy.get(selectors.hpNotification).should('not.exist')
    })
})
describe('Delete all notifications and return to homepage', () => {
    before(() => {
        cy.clearCookies()
        cy.visit('/notifications')
        cy.wait(1000)
    })
    it('Open and delete all notifications', () => {
        cy.get(selectors.notifPagePanelHeader).each((item) => {
            cy.wrap(item).click()
            cy.wrap(item).next().find(selectors.notifPagePanelContentDeleteButton).click()
        })
    })
    it('Check if all notifications are deleted', () => {
        cy.get(selectors.notifPagePanel).should('not.be.visible')
    })
    it('Check if you can go back to homepage using logo link', () => {
        cy.get(selectors.headerLogo).click()
        cy.url().should('be.equal', Cypress.config().baseUrl)
    })
    it('Check if notification on home page is not present', () => {
        cy.get(selectors.hpNotification).should('not.exist')
    })
})
describe('Check if homepage notification is always showing most recent unopened one', () => {
    before(() => {
        cy.clearCookies()
        cy.visit('/notifications')
        cy.wait(1000)
    })    
    it('Open one unread notificationa and go back to homepage to check if most recent changed', () => {
        cy.get(selectors.notifPagePanelHeader).then(($panel) => {
            if ($panel.hasClass('emphasjized')) {
                cy.get(selectors.notifPagePanelHeaderNotRead).first().as('panel').click()
                if ($panel.hasClass('emphasized')) {
                    cy.get(selectors.notifPagePanelHeaderNotRead).first().find(selectors.notifPagePanelHeaderSummary).then((summary) => {
                        const summaryText = summary.text()
                        cy.get(selectors.headerLogo).click()
                        cy.url().should('be.equal', Cypress.config().baseUrl)
                        cy.get(selectors.hpNotificationText).should((notificationText) => {
                            expect(notificationText.text()).to.contain(summaryText)
                        })
                    })
                }
            }
            
        })
    })
})

