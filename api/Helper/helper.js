module.exports = {

    basicResponse(data, message) {
        if (data != null) {
            res = { 
                status: true,
                data: data,
                message: null
            }
        } else {
            res = {
                status: false,
                data: null,
                message: message
            }
        }
        return res
    }
}