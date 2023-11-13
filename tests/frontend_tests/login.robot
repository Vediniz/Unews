*** Settings ***
Library     SeleniumLibrary
Resource    ${EXECDIR}/resources/resources.robot

Suite Setup       Open Site Domain    ${LOCAL_HOST}    ${browser}
Suite Teardown    Close Session


Force Tags    login

*** Test Cases ***

Login With Empty Email/Password
    Login on System    ${EMPTY}    ${EMPTY}
    Wait Until Page Contains    E-mail invalido    

Login With Empty Email
    Login on System    ${EMPTY}    admin 
    Wait Until Page Contains    E-mail invalido  

Login With Empty Password  
    Login on System    fatecam@gmail.com    ${EMPTY}   
    Wait Until Page Contains    E-mail ou senha inválidos

Login With an Invalid Email
    Login on System    teste123   admin
    Wait Until Page Contains   E-mail invalido


Login With an Invalid Password
    Login on System    fatecam@gmail.com   123
    Wait Until Page Contains    E-mail ou senha inválidos

Login with admin
    Admin Login
    Wait Until Page Contains Element   ${bt_edit}
    Wait Until Page Contains Element   ${bt_add}
    Wait Until Page Contains Element   ${bt_perfil}
