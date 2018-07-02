/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // The test loops through each feed in the allFeeds object
        // and ensures it has a URL defined and that the URL is not empty.
        it('URL defined and is not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

         // The test loops through each feed in the allFeeds object
         // and ensures it has a name defined and that the name is not empty.
         it('name defined and is not empty', function() {
             allFeeds.forEach(function(feed) {
                 expect(feed.name).toBeDefined();
                 expect(feed.name.length).not.toBe(0);
             });
         });

    });

    /* This is our second test suite. This suite is all about the Menu
    * functionality.
    */
    describe('The menu', function() {

        // The test ensures the menu element is hidden by default by checking
        // if the 'body' element has 'menu-hidden' class name.
        it('menu element is hidden by default', function() {
            var elem = $('body');

            expect(elem.hasClass('menu-hidden')).toBe(true);
        });

        // The test ensures the menu changes visibility when the menu icon
        // is clicked. The 'body' should not have 'menu-hidden' class name
        // after first click, after next click it should be set to true state.
        it('menu changes visibility when icon is clicked', function() {
            var icon = $('.menu-icon-link');
            var elem = $('body');

            icon.click();
            expect(elem.hasClass('menu-hidden')).toBe(false);
            icon.click();
            expect(elem.hasClass('menu-hidden')).toBe(true);
        });

    });


    /* This is our third test suite. This suite is all about the Initial Entries.
    * Testing the main feed loading functionality.
    */
    describe('Initial Entries', function() {

        // The asynchronous test that ensures when the loadFeed
        // function is called and completes its work, there is at least
        // a single .entry element within the .feed container.

        // Starts before main part of the test. Calls asynchronous loadFeed() function
        // to load '0' feed, when loading complete the callback done() will be fired
        // to continue test suite.
         beforeEach(function(done) {
            loadFeed(0, function() {
              done();
            });
         });

         // The main part of the test, checks if the number of the loaded feeds
         // is greater than 0. After finished done() is fired to continue testing.
         it('loadFeed function is called and completes its work', function(done) {
            expect($('div.feed').find('.entry').length).toBeGreaterThan(0);
            done();
         });
    });

    /* This is our fourth test suite. This suite is all about the New Feed Selection.
    */
    describe('New Feed Selection', function() {

         // The test ensures when a new feed is loaded by the loadFeed function
         // that the content actually changes.
         // We are declaring two variables, we will compare lately in the main part of test.
         var oldFeed, newFeed;

         // Before running the test we are calling asynchronous loadFeed() function
         // having '0' to load fisrt feed, and loadFeed() with parameter '1' as callback
         // to load second feed. The '.feed' element's html is saved to corresponding variables.
         beforeEach(function(done) {
            loadFeed(0, function() {
              oldFeed = $('.feed').html();
              loadFeed(1, function() {
                newFeed = $('.feed').html();
                done();
              });
            });
         });

         // Checking the old feed line html to be different from the new one by comparing the variables.
         it('when a new feed is loaded by the loadFeed function the content actually changes', function(done) {
            expect(oldFeed).not.toBe(newFeed);
            done();
         });

    });

}());
