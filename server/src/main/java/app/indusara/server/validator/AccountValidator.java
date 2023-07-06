package app.indusara.server.validator;

import app.indusara.server.entity.Account;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;


public interface AccountValidator extends Function<Account, ValidationResponse> {

    static AccountValidator isDisplayNameValid() {
        return account ->
                account.getDisplayName() != null ?
                        new ValidationResponse(ValidationResult.SUCCESS, "Success") :
                        new ValidationResponse(ValidationResult.INVALID_DISPLAY_NAME, "Display name cannot be null");
    }

    static AccountValidator isEmailValid() {
        return account ->
                account.getEmail() != null ?
                        new ValidationResponse(ValidationResult.SUCCESS, "Success") :
                        new ValidationResponse(ValidationResult.INVALID_EMAIL, "Email is null or invalid");
    }

    static AccountValidator isPasswordValid() {
        return account ->
                account.getPassword() != null ?
                        new ValidationResponse(ValidationResult.SUCCESS, "Success") :
                        new ValidationResponse(ValidationResult.INVALID_PASSWORD, "Password should contain at least 6 characters");
    }

    static AccountValidator isFullNameValid() {
        return account ->
                account.getFullName() != null ?
                        new ValidationResponse(ValidationResult.SUCCESS, "Success") :
                        new ValidationResponse(ValidationResult.INVALID_FULL_NAME, "Full name cannot be null");
    }

    static AccountValidator isGenderValid() {
        return account -> account.getGender() != null ?
                new ValidationResponse(ValidationResult.SUCCESS, "Success") :
                new ValidationResponse(ValidationResult.INVALID_GENDER, "Gender is null or invalid");
    }

    static AccountValidator isDobValid() {
        return account -> account.getDob() != null ?
                new ValidationResponse(ValidationResult.SUCCESS, "Success") :
                new ValidationResponse(ValidationResult.INVALID_DOB, "Dob is null or invalid");
    }

    static AccountValidator isJudoGradeValid() {
        return account -> account.getJudoGrade() != null ?
                new ValidationResponse(ValidationResult.SUCCESS, "Success") :
                new ValidationResponse(ValidationResult.INVALID_JUDO_GRADE, "Judo grade is null or invalid");
    }

    static AccountValidator isWeightClassValid() {
        return account -> account.getWeightClass() != null ?
                new ValidationResponse(ValidationResult.SUCCESS, "Success") :
                new ValidationResponse(ValidationResult.INVALID_WEIGHT_CLASS, "Weight class is null or invalid (Please reselect the weight class if you change the gender after choosing the weight class)");
    }

    static AccountValidator isProvinceValid() {
        return account -> account.getProvince() != null ?
                new ValidationResponse(ValidationResult.SUCCESS, "Success") :
                new ValidationResponse(ValidationResult.INVALID_PROVINCE, "Province is null or invalid");
    }

    static AccountValidator isClubNameValid() {
        return account -> account.getClubName() != null ?
                new ValidationResponse(ValidationResult.SUCCESS, "Success") :
                new ValidationResponse(ValidationResult.INVALID_CLUB_NAME, "Club name cannot be null");
    }

    default AccountValidator and(AccountValidator other) {
        return account -> {
            ValidationResponse res = this.apply(account);
            return res.getTitle().equals(ValidationResult.SUCCESS) ?
                    other.apply(account) :
                    res;
        };
    }


}



