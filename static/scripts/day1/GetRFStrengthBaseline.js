async function GetRFStrengthBaseline(workflowCtx, portal) {
    return {
      "Step 1": {
        name: "Get RF Strength baseline",
        stepCallback: async (stepState) => {
          await portal.setConfig((defaultConfig) => {
            return {
              ...defaultConfig
            };
          });
          return workflowCtx.showEndpoint({
            description:`### Description
This step Requests Diagnostics observation information via live periodic interval streaming of RF parameters from a list of IOT devices.`,
            endpointPermalink: "$e/Diagnostics%20Observations/StartDiagnosticsObservation",
            verify: (response, setError) => {
              if (response.StatusCode != 200) {
                setError(
                  "API Call wasn't able to get a valid response. Please try again."
                );  
                return false;
              } else {
                return true;
              }
            },
          });
        },
      },
      "Finish": {
        name: "What's Next",
        stepCallback: async () => {
          return workflowCtx.showContent(`## Have a look at some other Guided Walkthroughs
  
  Here are some popular use cases
  
  | Title | Description | Action |
  | --- | --- | --- |
  | How to Activate a Device | This guided walkthrough showcases how to use Verizon API to activate a device. | **[Try Now](page:guided-walkthroughs/activateDevice-walkthrough)** |
  | How to Get Device Location | This guided walkthrough showcases how to use Verizon API to Get Device Location. | **[Try Now](page:guided-walkthroughs/getDeviceLocation-walkthrough)** |
  | How to Get Device Usage | This guided walkthrough showcases how to use Verizon API to get device usage. | **[Try Now](page:guided-walkthroughs/deviceUsageHistory-walkthrough)** |
  | How to Fetch Regions | This guided walkthrough showcases how to use Verizon API to fetch the list of 5G Edge Regions. | **[Try Now](page:guided-walkthroughs/getRegions-walkthrough)** |
  | How to Fetch Device Information | This guided walkthrough showcases how to use Verizon API to fetch the Device Information List. | **[Try Now](page:guided-walkthroughs/fetchDeviceList-walkthrough)** |
  | How to Fetch Device Usage History | This guided walkthrough showcases how to use Verizon API to fetch the Device Information List. | **[Try Now](page:guided-walkthroughs/deviceUsageHistory-walkthrough)** |
  | How to do 4G/5G Address Validation | This guided walkthrough showcases how to use Verizon API for 4G/5G Address validation. | **[Try Now](page:guided-walkthroughs/day0/4G5GAddressValidation)** |
  | How to Activate Service For a Device | This guided walkthrough showcases how to use Verizon API to activate a device. | **[Try Now](page:guided-walkthroughs/day0/ActivateServiceForDevice)** |
  | How to Register for DiagnosticService Callback Service | This guided walkthrough showcases how to use Verizon API to register a callback listener URL. | **[Try Now](page:guided-walkthroughs/day0/RegisterDiagnosticServiceCallbackService)** |
  | How to do SIM Secure Assignment | This guided walkthrough showcases how to use Verizon API to assign SIM-Secure for IoT Licenses. | **[Try Now](page:guided-walkthroughs/day0/SIMSecureAssignment)** |
  | How to do Site Proximity | This guided walkthrough showcases how to use Verizon API for Site Proximity. | **[Try Now](page:guided-walkthroughs/day1/SiteProximity)** |
  | How to determine Network Conditions | This guided walkthrough showcases how to use Verizon API to determine near real-time network conditions. | **[Try Now](page:guided-walkthroughs/day1/NetworkConditions)** |
  | How to Register For Outages | This guided walkthrough showcases how to use Verizon API to register for outages. | **[Try Now](page:guided-walkthroughs/day1/RegisterForOutages)** |
  | How to Verify Network Location | This guided walkthrough showcases how to use Verizon API to verify network location. | **[Try Now](page:guided-walkthroughs/dayN/VerifyNetworkLocation)** |
  | How to Get Experience Score | This guided walkthrough showcases how to use Verizon API to get experience score. | **[Try Now](page:guided-walkthroughs/dayN/GetExperienceScore)** |
  | How to do Fota Upgrade | This guided walkthrough showcases how to use Verizon API to schedule a firmware upgrade for devices. | **[Try Now](page:guided-walkthroughs/dayN/FotaUpgrade)** |
  
        `);
        },
      },
    };
  }
  