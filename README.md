# Prime-numbers-API - jquery-example

```javascript
let url = `{{baseUrl}}/get-random-prime.php?key={{apiKey}}&include_explanations=<boolean>&include_prime_types_list=<boolean>&language=<string>&start=<number>&end=<number>&forced_number=<number>`

        console.log(url)

        $.ajax({
            url: url,
            type: 'get',
            cache: false,
            success: function (incomingData) {
                // console.log('success!');
                _results(incomingData);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("Status: ", textStatus); 
                console.log("Error: ", errorThrown);
                console.log("XMLHttpRequest: ", XMLHttpRequest.responseJSON.error);
                displayError(XMLHttpRequest.responseJSON.error, "get-random-prime")
            }
        });
```