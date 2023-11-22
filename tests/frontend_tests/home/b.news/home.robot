*** Settings ***
Library     SeleniumLibrary
# Library     RequestsLibrary
# Library     JSONLibrary
Resource    ${EXECDIR}/resources/resources.robot

Suite Setup       Run Keywords    Open Site Domain    ${LOCAL_HOST}    ${browser}
...               AND             Admin Login 
Suite Teardown    Close Session


Force Tags    home

*** Test Cases ***
Check home page
    [Tags]    open_site
    Open Site Domain   ${LOCAL_HOST}     ${browser}
    Wait Until Page Contains    Unews

Check News
    Check News