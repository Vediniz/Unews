*** Settings ***
Library     SeleniumLibrary
# Library     RequestsLibrary
# Library     JSONLibrary
Resource    ../resources/resources.robot


*** Test Cases ***
Check home page
    Open Site Domain   ${local_host}     ${browser}
    Wait Until Page Contains    Unews