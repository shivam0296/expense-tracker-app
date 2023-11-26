
export default class APIService {
    static updateTrip(id, body){
        return fetch(`http://127.0.0.1:5000/update/${id}/`, {
            'method': 'PUT',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }

    static auth(body){
        return fetch(`http://127.0.0.1:5000/auth`, {
            'method': 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(resp => resp.json())
    }

    static deleteTrip(id){
        return fetch(`http://127.0.0.1:5000/delete/${id}/`, {
            'method': 'DELETE',
            headers: {
                'content-Type': 'application/json'
            },
        })
    }

    static clearmqtt(){
        return fetch(`http://127.0.0.1:5000/mqttclear`, {
            'method': 'GET',
            headers: {
                'content-Type': 'application/json'
            },
        })
    }
}