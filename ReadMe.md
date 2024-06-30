<div align="center">
    <img src="./md/icon.png">
    <h3>CEO_WORDBOOK_REST_API</h3>
    <h5>Simple REST_API for CEO_WORDBOOK</h5>
    <a href="https://jj.ac.kr/">Jj_Univ</a> | <a href="https://www.instagram.com/jjuniv_ceo/">CEO instagram</a> | <a href="https://swagger.io/">Swagger</a>
</div>

## Project infomation
This project is for univ club [CEO](https://www.instagram.com/jjuniv_ceo/) in [Jeonju-university](https://jj.ac.kr/)

## Project Features
- Version checking
- Memo
    - Create
    - Read
    - Update
    - Delete
- Get word list form xlsx
- Account
    - Login
    - Logout

## Data structure
- Account
    - token : `identifier` | `String`
    - name : `account username` | `String`
    - id | `String`
    - pw : `password` | `String`
    - bookmarks : `user's bookmarks` | `Array<String>`
    - memos : `user's memos` | `Array<{ title: String, context : String }>`

## Swagger
This project support [Swagger](https://swagger.io/)
Swagger url is http://localhost/api-docs