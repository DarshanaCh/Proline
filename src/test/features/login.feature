Feature: User Authentication tests

  Background:
    Given User navigates to the practice application
    Given User click on the my account link
@login
  Scenario: Login should be success
    And User enter the username as "fdjqa0802"
    And User enter the password as "Password1"
    When User click on the login button
    Then Login should be success

# @login    
#  Scenario: Login should not be success
#    And User enter the username as "Invalid Username"
#    And User enter the password as "Invalid Password"
#    When User click on the login button
#    Then Login should be fail