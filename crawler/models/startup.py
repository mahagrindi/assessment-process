class StartupTunisia:
    def __init__(self, name, sector, created_at, label, logo, website, description, founders, email, phone):
        self.name = name
        self.sector = sector
        self.created_at = created_at
        self.label = label
        self.logo = logo
        self.website = website
        self.description = description
        self.founders = founders
        self.email = email
        self.phone = phone

    def to_dict(self):
        """Converts the Startup object into a dictionary."""
        return {
            "logo": self.logo,
            "name": self.name,
            "label": self.label,
            "sector": self.sector,
            "founders": self.founders,
            "created_at": self.created_at,
            "description": self.description,
            "website": self.website,
            "email": self.email,
            "phone": self.phone,
        }