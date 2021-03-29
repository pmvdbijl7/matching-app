# Matching app

![node-current](https://img.shields.io/node/v/npm)
![npm](https://img.shields.io/npm/v/npm)
![GitHub last commit](https://img.shields.io/github/last-commit/pmvdbijl7/matching-app)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/pmvdbijl7/matching-app)
[![GitHub license](https://img.shields.io/github/license/pmvdbijl7/matching-app)](https://github.com/pmvdbijl7/matching-app/blob/main/LICENSE)

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Database Structure](#database-structure)
- [Support](#support)
- [Roadmap](#roadmap)
- [Credits](#credits)
- [Contributors](#contributers)
- [License](#license)

## Features

- Authenitiaction
- Create profile
- Edit profile
- Update profile
- Delete profile
- Liking
- Upload profile picture
- Filter
- Matching other users

## Usage

To clone and run this application, you need [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/) (which comes with [npm](https://www.npmjs.com/)) installed on your computer. From your command line:

```bash
    # Clone this repository
    $ git clone https://github.com/pmvdbijl7/matching-app.git

    # Go into the repository
    $ cd matching-app

    # Install dependencies
    $ npm install

    # Run the app
    $ npm start
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

## Database Structure

Below is an example of how the database structure looks like from the 'users' collection.
| **NAME** | **TYPE** | **VALUE** |
|----------|----------|-----------|
| \_id | ObjectId | _jf308fdhg0ghg3_ |
| name | String | _John_ |
| gender | String | _Male_ |
| birthdate | Date | _2000-03-05_ |
| residence | String | _London_ |
| interested*in | String | \_Women* |
| biography | String | _Hello, my name is John :)_ |
| email | String | *john@gmail.com* |
| password | String | _j90f3hag;/2hfeag43gasdg3_ |
| createdAt | Date | _2021-03-02T10:12:48.899+00:00_ |
| updatedAt | Date | _2021-03-05T13:11:47.730+00:00_ |

## Support

If you run into any problems, feel free to send us an email.

## Roadmap

In this section ideas for this project will appear in the future.

## Credits

This project uses the following open source packages:

- [Node.js](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/)
- [Nodemon](https://nodemon.io/)
- [Express](http://expressjs.com/)
- [EJS](https://ejs.co/)
- [Mongoose](https://mongoosejs.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)

## Contributors

The project was made by: [Aron Pelgrim](https://github.com/aronpelgrim), [Joris Meester](https://github.com/JorisMeester), [Patrick van der Bijl](https://github.com/pmvdbijl7/) and [Christiaan Braun](https://github.com/christiaanbraun/).

## License

This Matching App is released under the [MIT](https://github.com/pmvdbijl7/matching-app/blob/main/LICENSE) License.
