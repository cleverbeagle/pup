Feature: Test if the admin user can login

  Scenario: I can login as an admin user
    Given I am on the login page
    When I enter my login details
    And I click login
    Then I am logged in as "Andy Warhol"
