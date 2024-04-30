
export const getLicenses = (req, res) => {
    res.status(200).json({ msg: "Getting all"});
}

export const getLicense = (req, res) => {
    res.status(200).json({ msg: "Getting single"});
}

export const createLicense = (req, res) => {
    res.status(200).json({ msg: "Creating"});
}

export const updateLicense= (req, res) => {
    res.status(200).json({ msg: "Updating"});
}

export const deleteLicense = (req, res) => {
    res.status(200).json({ msg: "Deleting"});
}