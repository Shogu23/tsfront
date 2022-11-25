export class Stagiaire {
    private id: number = 0;
    private lastname: string = '';
    private firstname: string = '';
    private email: string = '';
    private phoneNumber: string = '';
    private birthdate!: Date;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }
    
    public getLastName(): string {
        return this.lastname;
    }

    public setLastName(lastname: string): void {
        this.lastname = lastname;
    }

    public getFirstName(): string {
        return this.firstname;
    }

    public setFirstName(firstname: string): void {
        this.firstname = firstname;
    }
    
    public getEmail(): string {
        return this.email;
    }
    
    public setEmail(email: string): void {
        this.email = email;
    }
    
    public getPhoneNumber(): string {
        return this.phoneNumber;
    }
    
    public setPhoneNumber(phoneNumber: string): void {
        this.phoneNumber = phoneNumber;
    }

    public getBirthDate(): Date {
        return this.birthdate;
    }

    public setBirthDate(birthdate: Date): void {
        this.birthdate = birthdate;
    }
}