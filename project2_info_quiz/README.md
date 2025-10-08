# Web Development Project 2 - *Quiz App*

Submitted by: Valentyn Usenko

This web app: Quiz App

Time spent: 10 hours spent in total

## Required Features

The following **required** functionality is completed:


- [ x] **The app displays the title of the card set, a short description, and the total number of cards**
  - [x ] Title of card set is displayed 
  - [ x] A short description of the card set is displayed 
  - [ x] A list of card pairs is created
  - [ x] The total number of cards in the set is displayed 
  - [x ] Card set is represented as a list of card pairs (an array of dictionaries where each dictionary contains the question and answer is perfectly fine)
- [ x] **A single card at a time is displayed**
  - [x ] Only one half of the information pair is displayed at a time
- [x ] **Clicking on the card flips the card over, showing the corresponding component of the information pair**
  - [x ] Clicking on a card flips it over, showing the back with corresponding information 
  - [ x] Clicking on a flipped card again flips it back, showing the front
- [ x] **Clicking on the next button displays a random new card**

The following **optional** features are implemented:

- [ ] Cards contain images in addition to or in place of text
  - [ ] Some or all cards have images in place of or in addition to text
- [x ] Cards have different visual styles such as color based on their category
  - Example categories you can use:
    - Difficulty: Easy/medium/hard
    - Subject: Biology/Chemistry/Physics/Earth science

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='https://imgur.com/a/EaxsOio' title='Video Walkthrough' width='' alt='Video Walkthrough' />





## Notes

The only challenge I've faced was flipping animation and implementing useState






// For the text box:

# Web Development Project 3 - *Quiz app*

Submitted by: Valentyn Usenko

This web app: Quiz App

Time spent: 2 hours spent in total
## Required Features


The following **required** functionality is completed:

- [x ] **The user can enter their guess into an input box *before* seeing the flipside of the card**
  - Application features a clearly labeled input box with a submit button where users can type in a guess
  - Clicking on the submit button with an **incorrect** answer shows visual feedback that it is wrong 
  -  Clicking on the submit button with a **correct** answer shows visual feedback that it is correct
- [x ] **The user can navigate through an ordered list of cardss**
  - A forward/next button displayed on the card navigates to the next card in a set sequence when clicked
  - A previous/back button displayed on the card returns to the previous card in the set sequence when clicked
  - Both the next and back buttons should have some visual indication that the user is at the beginning or end of the list (for example, graying out and no longer being available to click), not allowing for wrap-around navigation

The following **optional** features are implemented:


- [ ] Users can use a shuffle button to randomize the order of the cards
  - Cards should remain in the same sequence (**NOT** randomized) unless the shuffle button is clicked 
  - Cards should change to a random sequence once the shuffle button is clicked
- [ ] A user’s answer may be counted as correct even when it is slightly different from the target answer
  - Answers are considered correct even if they only partially match the answer on the card 
  - Examples: ignoring uppercase/lowercase discrepancies, ignoring punctuation discrepancies, matching only for a particular part of the answer rather than the whole answer
- [ ] A counter displays the user’s current and longest streak of correct responses
  - The current counter increments when a user guesses an answer correctly
  - The current counter resets to 0 when a user guesses an answer incorrectly
  - A separate counter tracks the longest streak, updating if the value of the current streak counter exceeds the value of the longest streak counter 
- [ ] A user can mark a card that they have mastered and have it removed from the pool of displayed cards
  - The user can mark a card to indicate that it has been mastered
  - Mastered cards are removed from the pool of displayed cards and added to a list of mastered cards


The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality! : if your guess is right, then the text box will turn green

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://imgur.com/gallery/project-2-1-yXKrcGN#yUkvRCS' title='Video Walkthrough' width='' alt='Video Walkthrough' />


## Notes

Hardest paer fore me was to make the text box change color when the button was pressed
