
# Ethereum Token Explorer

## Development - Steps to MVP
#### 1. Gather more historical tx records to database
We want a record of all transfer events from each ERC20 token. This will be stored in our database.
This is done for the test token, and needs to be repeated for more tokens. Straitforward, and takes some minutes per token.

#### 2. Pre-process data for visualization
We want to visualize the 'rich list' on each historical block, for each token.
This will involve calculating the balances of each address based on the transfer records up until that point, and storing this in the database.
The front end will load the top-x addresses for a given block / day (as many as is reasonable) via database query.

#### 3. Visualize data
Using D3, we'll render a visual of the data, hopefully involving circles of various sizes.
Users can go between blocks and see how things change over time.

#### 4. UI Polish
Using semantic-ui-react to make things look decent, basic responsivness.

#### 5. Readme / Repo Polish
Have gifs showing the different actions you can take on the site, and showing off visualizations.

## Development - Further Goals

#### 1. Real-time data gathering
The server will continually look for new blocks, and will get the Transfer events for the relevant tokens. These will be added to the database. 

#### 2. Visualizaion animations
It would be nice to show an animation of how the rich list changes over time.

#### 3. Basic ERC721 Support
Using the same event-gathering method, show things like the crypto-kitties rich list, based on previous auction sale prices of kitties.

## Page Goals
#### Block explorer basics
Look through a block and see all the transfer events that went on for a token in that block

#### Historical rich-lists for each ERC20 token
Can go through each day and see where tokens are moving to and from

#### Historical rich-lists for each ERC721 token
