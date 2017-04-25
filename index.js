(function() {
    var json = [];
    var validated = true;
    var count = 0;

    function toJSONString(form) {
        var obj = {};
        var elements = form.querySelectorAll("input, select, checkbox");
        validated = true;
        for (var i = 0; i < elements.length; ++i) {
            var element = elements[i];
            var name = element.name;
            var value = element.value;
            if (name === 'age' && value < 0 || name === 'age' && isNaN(value)) {
                alert("Please enter a number greater than 0 for the 'Age' field.");
                validated = false;
                return;
            } else if (name === 'rel' && value === "") {
                alert("The 'Relationship' field is required.");
                validated = false;
                return;
            } else {
                obj['id'] = count;
                if (element.type === 'checkbox') {
                    value = element.checked;
                }
                if (name) {
                    obj[name] = value;
                }
            }
        }
        count++;
        return JSON.stringify(obj);
    }

    document.addEventListener("DOMContentLoaded", function() {
        var output = document.getElementsByClassName("debug")[0];
        var orderlist = document.getElementsByClassName("household")[0];
        var add = document.getElementsByClassName("add")[0];
        var deleteButtons = document.getElementsByClassName("delete");
        var form = document.getElementsByTagName("form")[0];
        add.addEventListener("click", function(e) {
            e.preventDefault();
            var newJSON = toJSONString(form);
            if (validated) {
                json.push(newJSON);
                orderlist.innerHTML = "";
                json.forEach(function(object, i) {
                    object = JSON.parse(object);
                    var id = object.id;
                    var age = "Age: " + object.age;
                    var rel = "Relationship: " + object.rel;
                    var smoker = (object.smoker
                        ? "Smoker"
                        : "Not a smoker");
                    var listitems = "<li><ul id='" + id + "'>";
                    listitems += "<li>" + age + "</li>";
                    listitems += "<li>" + rel + "</li>";
                    listitems += "<li>" + smoker + "</li>";
                    listitems += "</ul><button class='delete'>delete</button></li>";
                    orderlist.innerHTML += listitems;
                });
                for (var i = 0; i < deleteButtons.length; i++) {
                    deleteButtons[i].addEventListener('click', function(e){
                      var parent = this.parentNode;
                      var thisId = parent.getElementsByTagName('ul')[0].id;
                      json.forEach(function(object, i) {
                        object = JSON.parse(object);
                        if (object.id == thisId) {
                          json.splice(i, 1);
                        }
                      });
                      parent.parentNode.removeChild(parent);
                    }, false);
                }
            }
        }, false);

        form.addEventListener("submit", function(e) {
            e.preventDefault();
            json.forEach(function(object){
              output.innerHTML += object + "\n";
            });
            output.style.display = "table";
            while (orderlist.hasChildNodes()) {
               orderlist.removeChild(orderlist.firstChild);
            }
        }, false);
    });

})();
