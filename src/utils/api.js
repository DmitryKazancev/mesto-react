//Class API
class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
        this._authorization = options.headers.authorization;
    }

    //Get response function
    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    //get info about user
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._getResponseData)
    }

    //get array cards
    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._getResponseData)
    }

    //update info about user
    setOwnerInfo(ownerInfo) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: ownerInfo.nameInput,
                about: ownerInfo.jobInput
            })
        })
            .then(this._getResponseData)
    }

    //update user avatar
    setOwnerAvatar(ownerAvatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: ownerAvatar.linkAvatar
            })
        })
            .then(this._getResponseData)
    }

    //create new card
    addNewCard(cardInfo) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: cardInfo.cardName,
                link: cardInfo.link
            })
        })
            .then(this._getResponseData)
    }

    //put like on card
    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this._getResponseData)
    }

    //delete like on card
    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._getResponseData)
    }

    //delete card created by user
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._getResponseData)
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
        authorization: '0be97cdd-5214-4857-975b-3ef352f3ad1f',
        'Content-Type': 'application/json'
    }
});


export default api;