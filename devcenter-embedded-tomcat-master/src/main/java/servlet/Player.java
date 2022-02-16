package servlet;

// Class For Mapping User values to Database Values
public class Player {
    private String username;
    private String firstname;
    private String lastname;
    private String pcode;
    private Long phone;
    private String agegroup;
    private String email;
    private String desiredteam;
    private String desired_positions;
    private String address;
    private Integer pin;
    private String country;
    private String state;
    private String city;


    public Player(String username, String firstname, String lastname,String pcode, Long phone, String email, String agegroup, String desiredteam, String desired_positions, String address, Integer pin, String country, String state,String city) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.pcode = pcode;
        this.phone = phone;
        this.email = email;
        this.agegroup = agegroup;
        this.desiredteam = desiredteam;
        this.desired_positions = desired_positions;
        this.address = address;
        this.pin = pin;
        this.country = country;
        this.state = state;
        this.city = city;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPcode() {
        return pcode;
    }

    public void setPcode(String pcode) {
        this.pcode = pcode;
    }

    public Long getPhone() {
        return phone;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAgegroup() {
        return agegroup;
    }

    public void setAgegroup(String agegroup) {
        this.agegroup = agegroup;
    }

    public String getDesiredteam() {
        return desiredteam;
    }

    public void setDesiredteam(String desiredteam) {
        this.desiredteam = desiredteam;
    }

    public String getDesired_positions() {
        return desired_positions;
    }

    public void setDesired_positions(String desired_positions) {
        this.desired_positions = desired_positions;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getPin() {
        return pin;
    }

    public void setPin(Integer pin) {
        this.pin = pin;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

}
