describe('Test suit 1: Search focused view - General functionality check, map center view', function(){
    before(function () {
        cy.clearCookie('PHPSESSID');
        cy.clearCookie('identity');
        //cy.login();
       // cy.maintain_login();
        const clear = Cypress.LocalStorage.clear;
        Cypress.LocalStorage.clear = function (keys, ls, rs) {
            if (keys) {
                return clear.apply(this, arguments)
            }        
        }
        cy.wait(4000);
        cy.viewport(1440, 900);
        })

        beforeEach(() => {
            Cypress.Cookies.preserveOnce('PHPSESSID');
            Cypress.Cookies.preserveOnce('identity');
            })
            


            it("Test case 1: Open sub-site and verify URL",function(){
                cy.visit("https://search.dev.caredove.com/ocsacovid");
                cy.url('https://search.dev.caredove.com/ocsacovid').should('include', '/ocsacovid');

            })

            it("Test case 2: Enter search address", function(){

                cy.get('#rc_select_1').click().type("86 albert st waterloo, on").wait(2000).type("{downarrow}").wait(1000).type("{enter}").wait(2000);

            })

            it('Test case 3: Validate required field - address or category', function(){
                cy.get('#servicelist > .ant-row > .ant-btn').should('have.class', 'ant-btn ant-btn-primary ant-btn-lg').click({force: true}).wait(2000);
                //cy.get('#servicelist > .ant-row > .ant-btn').click({force: true});
                cy.wait(1000);
            
                cy.get('.ant-popover-inner-content > div').should("have.text", "Please select a search option.");
            })    
              
             it('Test case 4: category selection', function(){   
                cy.get('.search___StyledCol2-sc-151bjrg-12 > .ant-row > :nth-child(1)').click().wait(4000)
                cy.get('.input___StyledLabel-bv2bvx-3 > .ant-typography > strong').click({force: true});
                cy.get('.search___StyledCol2-sc-151bjrg-12 > .ant-row > :nth-child(1)') .trigger('mouseout');
                cy.wait(2000);
                //cy.get('.taxonomy_item___StyledButton4-ruip16-6').trigger('mouseout').wait(2000);
            })

            it('Test case 5: Service list click validate', function(){
                cy.get('#serviceList-1').click().wait(2000);
            })

            it('Test case 6: Accessing iFrame using service request pop up and get access to booking form 1 & 2', function(){
                cy.get('.ant-modal-body > :nth-child(1) > .ant-btn-primary').click({force: true}).wait(20000);
               
                cy.get("iframe").then( $iframe => {

                    const $doc = $iframe.contents();
                    cy.wrap($doc.find("#eligibility_0_1_val")).click({force:true});
                    //cy.wrap( $doc.find("#input") ).type( "test", { force: true });
                    cy.wrap( $doc.find("#nextButton") ).click({ force: true }).wait(2000);

                    cy.wrap( $doc.find("#fname_field") ).type(  "fname",  { force: true });
                    cy.wrap( $doc.find("#lname_field") ).type( "lname",{ force: true });
                    cy.wrap( $doc.find("#email_field_registrant") ).type(   "manish@caredove.com",{ force: true });
                    cy.wrap( $doc.find("#cancelButton") ).click({ force: true }).wait(2000);
                    
                });


            })


            // it('Close booking wizard', function(){
            //     cy.get(':nth-child(27) > .ant-modal-root > .ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-close > .ant-modal-close-x > .anticon > svg > path').click({force:true});
            //     cy.wait(1000);
            // })
            it('Test case 7: Close service pop up', function(){
                cy.get('.ant-modal-close-x > .anticon > svg').click({force: true});
                cy.wait(1000);
            })

            it('Test case 8: Request a service from service list', function(){
                cy.get('.ant-btn > div').click({force: true})
                cy.wait(20000);
            })
            it('Test case 9: Close booking wizard', function(){
                cy.get('.ant-modal-close-x > .anticon > svg > path').click({force: true});
                cy.wait(1000);
            })
            it('Test case 10: Using advance search', function(){
                cy.get('.advanced_filter___StyledCol-nfps9s-2 > .ant-typography').click({force: true});
                cy.wait(1000);
                cy.get('.ant-checkbox-wrapper > :nth-child(2)').click({force: true});
                cy.get('.ant-modal-footer > .ant-btn-primary > span').click({force: true});
                cy.wait(4000);
            })
            it('Test case 11: Scroll to fotter', function(){
                cy.get('.ant-layout-footer').scrollIntoView();
                cy.wait(4000);
            })
            it('Test case 12: Check load more button', function(){
                cy.get('.ant-col > .ant-btn > span').should('have.text', 'Show more results').click({force:true});
                // cy.get('.services_list___StyledRow7-sc-132grfx-27 > .ant-col > .ant-btn').click({force: true});
                cy.wait(4000);
            })
            it('Test case 13: Scrool up', function(){
                cy.get('.leaflet-container').scrollIntoView();
            })

            it('Test case 14: View service area', function(){
                cy.get('#serviceList-1 > :nth-child(1) > .ant-col-24 > .ant-row > .services_list___StyledCol2-sc-132grfx-20').click().wait(2000);
                cy.get('.service_details___StyledCol15-sc-1ddt1w1-26 > .services_coveragearea___StyledText-sc-18oog1n-1 > .ant-typography > .services_coveragearea___StyledSpan-sc-18oog1n-2').click({force: true}).wait(2000);
            })

            it('Test case 15: Scrool to Map', function(){
                cy.get('.leaflet-container').scrollIntoView();
            })
        })