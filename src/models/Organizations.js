class Organization {
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.location = data.location;
      this.phoneNumber = data.phoneNumber;
      this.email = data.email;
      this.description = data.description;
      this.status = data.status;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
  
      this.address = {
        street: data.address.street,
        city: data.address.city,
        state: data.address.state,
        zipCode: data.address.zipCode,
        country: data.address.country
      };
  
      this.settings = {
        theme: {
          primaryColor: data.settings.theme.primaryColor,
          secondaryColor: data.settings.theme.secondaryColor
        },
        notifications: {
          email: data.settings.notifications.email,
          sms: data.settings.notifications.sms,
          whatsapp: data.settings.notifications.whatsapp
        },
        appointmentDuration: data.settings.appointmentDuration,
        workingHoursStart: data.settings.workingHoursStart,
        workingHoursEnd: data.settings.workingHoursEnd,
        workingDays: data.settings.workingDays
      };
  
      this.specialties = data.specialties;
      this.tags = data.tags;
    }
  }
  