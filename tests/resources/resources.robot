*** Settings ***
Library    SeleniumLibrary
Library    String

*** Variables *** 
${LOCAL_HOST}     localhost:3000

# --- buttons
${bt_header_login}    //*[@class="header"]//*[@class="button"][contains(text(), "Entrar")]
${bt_close_news}      //*[@class="svg-inline--fa fa-xmark close-button"]

${bt_add}             //*[@class="menu-item"][contains(text(), 'Adicionar')]
${bt_perfil}          //*[@class="menu-item"][contains(text(), 'Perfil')]
${bt_edit}            //*[@class="button"][contains(text(), 'Editar')]

${bt_save}            //*[@class="button"][contains(text(), 'Salvar')]
${bt_delete}          //*[@class="button btn-delete"]
${bt_login}           //*[@class="cardSign"]//*[@class="button"][contains(text(), "Entrar")]

${bt_magnifying_glass}    //*[@class="svg-inline--fa fa-magnifying-glass "]

${bt_filters}         //*[@class="filterBar"]
${bt_apply_filter}    //*[@class="button"][contains(text(), 'Aplicar')]

# -- textfield
${tf_email}           //*[@placeholder="E-mail"]
${tf_password}        //*[@placeholder="Senha"]
# --- --- news
${tf_news_title}      //*[@placeholder="Titulo"]
${tf_news_image}      //*[@placeholder="Imagem"]
${tf_news_content}    //*[@name="text"]

${ph_login}           //*[@class="cardSign"]
${ph_filters}         //*[@class="checkbox-filters"]//*[@for="generic_filter"]
${ph_news_card}       //*[@class="card"]
${ph_card_title}      //*[@class="card-title"]
${ph_card_text}       //*[@class="card-text"]
${ph_card_footer}     //*[@class="card-footer"]

${ph_search}          //*[@placeholder="Pesquisar..."]

${ph_news_overlay}    //*[@class="content-newsModal"]

#--- Dropdown
${dp_filter_item}    //*[@class="filtersDiv"]//*[@for="generic_filter1"]

# --- 
${modal_overlay}    //*[@class="modal-overlay"]
${logo}             //*[@class="brand"]

*** Keywords ***
# --- Start tests ---
Open Site Domain
    [Arguments]    ${site_domain}    ${browser}
    Log To Console    Opening the browser
    ${webdriver}    Set Variable    
    IF   '${browser}'=='chrome'
           ${webdriver}=    Evaluate    sys.modules['webdriver_manager.chrome'].ChromeDriverManager().install()    sys, webdriver_manager.chrome
    ELSE IF    '${browser}'=='firefox'
       ${webdriver}=    Evaluate    sys.modules['webdriver_manager.firefox'].GeckoDriverManager().install()    sys, webdriver_manager.firefox
    END
    Open Browser    ${site_domain}    ${browser}    executable_path=${webdriver}
    Maximize Browser Window


Check Url
    [Arguments]    ${route}
    Go To    ${LOCAL_HOST}/${route}

# --- Finishing Test --- 
Close Session
    Log To Console   Closing the browser
    Close Browser

# --- News Tests ---
Check News
    ${qt_news}    Get Element Count    //*[@class="card"]
    FOR    ${i}    IN RANGE    1    ${qt_news+1}
        ${title}   Get Text    (//*[@class="card"])[${i}]//*[@class="card-title"]
        Wait and Click Element    (//*[contains(text(), "Ler mais")])[${i}]
        Check News Title    ${title}
        Check News Text
        Close News
    END
Check News Title
    [Arguments]    ${title}
    Wait Until Page Contains Element    //*[@class="content-newsModal"]//*[contains(text(), '${title}')]

Check News Text
    Wait Until Page Contains Element    //*[@class="texts"]
    ${news_text}    Get Text    //*[@class="texts"]
    Should Not Be Empty    ${news_text}

Close News
    Wait and Click Element    ${bt_close_news}


Open Edit News
    [Arguments]    ${search_card}
    ${qt_cards}    Get Element Count    ${ph_news_card}
    FOR    ${i}    IN RANGE    1    ${qt_cards+1}
        ${actual_card}    Get Text    ${ph_card_title}
        ${card_pos}    Set Variable    ${i}
        Exit For Loop If    '${actual_card}'=='${search_card}'
    END
    Wait and Click Element    (${bt_edit})[${card_pos}]

# --- User Tests --- 
Open Login Page
    Wait and Click Element              ${bt_header_login}
    Wait Until Page Contains Element    ${ph_login} 

Admin Login
    Open Login Page
    Input Text    ${tf_email}            fatecam@gmail.com
    Input Text    ${tf_password}         admin
    Wait And Click Element               ${bt_login}
    Wait Until Page Contains Element     //*[@class="logout"]//*[contains(text(), 'Fatec AM')]
    
Login on System
    [Arguments]    ${email}    ${password}    ${username}=false
    Open Login Page
    Input Text    ${tf_email}            ${email} 
    Input Text    ${tf_password}         ${password}
    Wait And Click Element               ${bt_login}
    IF    '${username}'!='false'    Wait Until Page Contains Element     //*[@class="content-menu"]//*[contains(text(), "${username}")]    ELSE    No Operation

Logout of System
    Wait and Click Element    //*[@class="button"][contains(text(), 'Sair')]
    Wait Until Page Does Not Contain    //*[@class="button"][contains(text(), 'Sair')]

### Auxiliar Keywords
Wait and Click Element
    [Arguments]    ${button}
    Wait Until Page Contains Element    ${button}
    Click Element    ${button}
