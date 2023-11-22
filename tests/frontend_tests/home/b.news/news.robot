*** Settings ***
Library     SeleniumLibrary
Resource    ${EXECDIR}/resources/resources.robot

Suite Setup       Run Keywords    Open Site Domain    ${LOCAL_HOST}    ${browser}
...               AND             Admin Login 
Suite Teardown    Close Session


Force Tags    news

*** Test Cases ***
Check home page
    [Tags]    open_site
    Wait Until Page Contains    Unews

Create News
    Wait and Click Element    ${bt_add}
    Input Text    ${tf_news_title}    Noticia Test
    Input Text    ${tf_news_image}    por hora vazio
    ${filter}    Replace String    ${ph_filters}    generic_filter    Alunos
    Wait and Click Element    ${filter}
    Input Text    ${tf_news_content}       Testando a criação de noticias
    Wait and Click Element    ${bt_save}

Edit News
    Open Edit News    Noticia Test
    Input Text        ${tf_news_title}    Test Edit
    Input Text        ${tf_news_content}  Test content
    Wait and Click Element    ${bt_save}

    Wait Until Page Contains Element       ${ph_card_title}\[contains(text(), 'Test Edit')]
    Wait Until Page Contains Element       ${ph_card_text}\[contains(text(), 'Test content')]

Search News
    Input Text    ${ph_search}    Test Edit
    Wait and Click Element    ${bt_magnifying_glass}
    Wait Until Page Contains Element    ${ph_card_title}\[contains(text(), 'Test Edit')]
    Wait Until Page Contains            1 notícia encontrada

Delete News
    Open Edit News   Test Edit
    Wait and Click Element    ${bt_delete}
    Wait and Click Element    //*[@class="modal-delete"]${bt_delete}
    Sleep    2s
    Page Should Not Contain Element       ${ph_card_title}\[contains(text(), 'Test Edit')]
