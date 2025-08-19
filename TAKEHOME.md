### Quick Stats

This is a simple feature to show some quick stats about the Visits and Actions in the last 120mins.
This is made of a single Vue component (QuickStats.vue) that displays a button at the foot of each page.
Clicking the button will show a modal with the stats taken from the API endpoint given.
The vue component is then injected into the footer using `Template.pageFooter` hook.
### How this works
This feature uses a Vue component to display the stats. 
It fetches the data from the Matomo API using AjaxHelper component to get data from `Live.getCounters` method, which returns the last visits, their actions and other statistics.

### Initial Setup
 - Create fake visits in the last 120 minutes using 
   ``` 
   ddev matomo:console plugin:activate VisitorGenerator
   ddev matomo:console visitorgenerator:generate-visits
   ```
 - Make sure the `Live.getCounters` API method is enabled in your Matomo instance.
### Running the Test
 - To run the test, you can use the following command:
   ```
   ddev matomo:console test:run-ui --plugin=QuickStats
   ```
 - There are a few gotchas with running the tests:
   - Remember to use `ddev matomo:console test:run-ui --plugin=PluginName` instead of `./console test:run-ui --plugin=QuickStats` 
   to ensure the correct environment is used.


### Other Testing Considerations
 - I would probably add a SystemTest to check that the api we use `Live.getCounters` is returning the expected data.
   - I will put this under `plugin/QuickStats/tests/System`
 - I'll also add in an integreation test to check that the Vue component is rendering correctly and that the data is being displayed as expected.
   - This should also test that when the button is clicked the modal opens.
   - This could also test that when the modal is opened, the API to fetch counters is called and that the data is displayed correctly.
   - This will be under `plugin/QuickStats/tests/Integration`