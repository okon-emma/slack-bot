function validateCity(city) {

    if (!city || typeof city !== 'string') {
        return false;
    }

    if (!/^[a-zA-Z0-9\s]+$/.test(city)) {
        return false;
    }

    return true;
}

module.exports = validateCity;
