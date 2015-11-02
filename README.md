Kitchen Templates
=================

This temporary repository contains template files used by kitchen-CLI to assemble meteor application.

It is for contributions related to front-end improvements on **bootstrap3**, **semantic-ui** and **materialize** (until complete kitchen-CLI goes fully open source).

Mission
------- 
Goal is to make templates good enough, so generator can produce all example applications with "bootstrap3", "materialize" and "semantic-ui" without changing input .json file.
So, idea is: describe application (create input .json file) and choose your favorite frontend - without modifying your .json file.

Cool - but this currently doesn't work :) Official examples contains "hard-coded" css class names specific to bootstrap3 (for example, in menus we have "nav navbar-nav" etc.).

We are close to this "goal", but there is still some job to be done.


Current status:
---------------

- **bootstrap3** - default framework, currently best implemented
- **semantic-ui** - almost there - there are some visual issues, also problems with modals
- **materialize** - latest, not fully implemented yet


What this repository contains?
------------------------------

When meteor-kitchen is installed, you can find this directory at `~/.meteor-kitchen/templates/` path.

Here, we got two top directories:

- **code**
- **ui**


### "code" directory

Non-visual, mostly server side code, router code etc. The same code is used by all frameworks.


### "ui" directory

Contains visual templates (html, js and css/less)

- **bootstrap3** - default framework
- **bootstrap3-raw** - deprecated - ignore it
- **materialize**
- **semantic-ui**

Each framework directory (bootstrap3, materialize, semantic-ui) have the same sub-directory structure:


#### "<framework_name>.json" file

In the root, there is `<framework_name>.json` file. It tells generator what (atmosphere) packages are required for this framework and what files/directories to copy when generating application.
"kitchen" knows what to do with "components", "layouts" and "pages" directory. All other files & directories that should be included into generated application should be listed in this .json file to instruct generator what to do / where to copy files.


#### "styles.less" file

This file will be automatically copied to resulting application into `/client/styles/styles.less`. Here you should define all styling related to layouts, pages and components. 
This is not the best practice - it's better if we have separate styling for each layout/component so kitchen can assemble only styling used in particular project, but that feature will be added in future versions (and this file will be split into multiple files).
For now, use this file to style everything you got in `components`, `layouts` and `pages` directories.


#### "layouts" directory

Directory contains master layouts - we have different layouts for application with and without user account system. 
Application with user account system actually have two layouts - public and private. **Public layout** is visible only to anonymous users, and **private layout** is visible only to authenticated users.
Application without user account system have only one layut called **free layout**.

See `layout_container_accounts` and `layout_container_simple` (html & js files). First is used for application with, and second for app without user account system.

`layout_content_...` are multiple different layouts - `empty` (empty page), `sticky_footer` - pagewith sticky footer at the bottom, `navbar` - page with top navbar and sticky footer etc.

Layout is actually generated by "zone" object and this is where user can specify/choose different layouts (in .json input file `public_zone`, `private_zone` and `free_zone` you can specify `layout`).


#### "pages" directory

Directory contains:

Predefined pages, such as: "login", "register", "forgot_password", "verify_email" etc.

Page layouts, such as `page_empty` (empty page), `page_subcontent_sidenav` (page with subcontent - subpage, with side menu - see "example-subpages"), etc.

Page layout is automatically choosen by generator (depending on do page have subpages and menu) if not specified in user's input json file (page's `template` property). These templates are rendered inside masterlayout (or inside parent-page if we are talking about subpages).


#### "components" directory

Contains templates (html & js files) for kitchen's built-in components, such as "form", "dataview", "jumbotron", etc. 
When kitchen generates application, these component templates are loaded by kitchen which manipulates with DOM elements, replaces strings and inserts resulting HTML into parent page.

Kitchen "recognizes" elements by their id attributes. 

For example: in jumbotron component there is `<p id="jumbotron-button">` - meteor kitchen searches for element with id `jumbotron-button` - if user is not specified "button_route" in input json file - button will be removed by kitchen, or, if user specified route, kitchen will properly set button title etc.
Also, uppercase strings are replaced by kitchen. Using the same example, in jumbotron there is `BUTTON_TITLE` string which will be replaced with button title specified by user.

**So, kitchen don't care what you have in your markup, or what element types are you using, but you need to specify proper element id - or kitchen will not know what to do with your template.**

Special strings that will be replaced by kitchen are:

In zones, pages and components:

```
APP_TITLE
COMPONENT_TITLE_ICON_CLASS
COMPONENT_TITLE
COMPONENT_CLASS
QUERY_VAR
QUERY_NAME
COLLECTION_VARIABLE
COMPONENT_ID
```

(TODO: explain better :)


Styling guide
=============

**Please try your components to be fully native** without changing their visual look & feel with CSS - as in framework's examples. 
For example: bootstrap button should look exactly as naked bootstrap button - don't add your "spices" like shadows or something - don't touch basic elements.

If we have generated fully native markup, for example naked bootstrap, then it's easy to add any theme to generated application (and kitchen also suppoert themes, currently only for bootstrap3 framework).

**As less as possible css** - please try to add as less as possible css into `styles.less`.


How to test did you made a good job?
====================================

If you are playing with for example "materialize" - try to make "example-invoices" application with "materialize" framework (modify official example .json files - remove bootstrap specific css class names) and see if everything looks as it should, and is positioned well, is responsive etc. (don'tforget to clean-build your app if you previously built it with another framework).
If you are ambitious, try to build all examples (of course, you'll need to modify them - remove bootstrap classes from .json).


And then - pull request! I'll be happy, and be sure you'll appear in contributors list in meteorkitchen.com.

Thank you for contributing to this cool project, and happy coding! 

Petar 
:)
