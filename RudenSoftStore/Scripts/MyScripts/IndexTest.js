$(document).ready(function () {
    var lib = {
        log: function (message, options) {
            //If options is null, undefined or 0, this code will set it to "{}"
            options = options || {};
            console && console.log(message)
        }
    };

    //ДОБАВЛЕНИЕ ЭЛЕМЕНТОВ НА СТРАНИЦУ ПО КНОПКЕ
    var compAdder = {
        options: {
            componentTypes: []//listed element types
        },
        init: function (options) {
            compAdder.options = $.extend(compAdder.options, options);
        },
        add: function (compTag, content, quantity, inline, destionation) {
            //если тег содержится в списке допустимых
            if ($.inArray(compTag, compAdder.options.componentTypes) != -1) {
                var startTag = "<" + compTag + ">";
                var endTag = "<" + compTag + "/>";
                var htmlItem = startTag + content + endTag;
                var resHtml = [];
                if (inline) {
                    for (var i = 0; i < quantity; i++) {
                        resHtml.push(htmlItem);
                        resHtml.push("<br/>");
                    }
                }
                else {
                    for (var i = 0; i < quantity; i++) {
                        resHtml.push(htmlItem);
                    }
                }
                $(destionation).append(resHtml.join(""));
            }

        }
    };

    compAdder.init(['p', 'b', 'div', 'span', 'a']);
    $('.AddElement').click(function (e) {
        e.preventDefault();
        compAdder.add('span', 'something', 3, true, '#task1');
    });

    //КАЛЬКУЛЯТОР (не реализована приоритетность операций)
    var Calc = {
        totalString: [''],
        currentString: [''],
        options: {
            calcId: ''
        },
        init: function (options) {
            Calc.options = $.extend(Calc.options, options);
        },
        process_click: function () {
            $(Calc.options.calcId + " .item").click(function (e) {
                e.preventDefault();
                var val = $(this).attr('id');
                var lastItem = Calc.currentString[Calc.currentString.length - 1];
                //если предыдущии расчеты закончились, то использовать результируещее значение для новых расчетов
                if (Calc.currentString[Calc.currentString.length - 2] == '=') {
                    Calc.currentString = [lastItem.toString()];
                }
                if (val != '=') {
                    var isOperation = $(this).hasClass('operation');
                    if (!isOperation) {
                        //если предыдущий элемент - операция, то  добавить новый элемент массива для записи операнда
                        if (lastItem == '+' || lastItem == '-' || lastItem == '*' || lastItem == '/') {
                            Calc.currentString.push("");
                            lastItem = Calc.currentString[Calc.currentString.length - 1];
                            lib.log('push is made');
                        }
                        //если кома, то не может быть 2 комы в одномэлементе и кома не должна быть первая(до нее должно быть какое-то число)
                        if (val == '.') {
                            if (lastItem.indexOf('.') == -1 && lastItem.length > 0) {
                                lastItem += val;
                                Calc.currentString[Calc.currentString.length - 1] = lastItem;
                                lib.log('symbol: ' + val);
                            }
                        }
                        else {//если цифра
                            if (val == '0') {//если 0, то перед ним должна быть либо кома, либо пусто.
                                if (lastItem.indexOf('.') != -1 || lastItem.length == 0) {
                                    lastItem += val;
                                    Calc.currentString[Calc.currentString.length - 1] = lastItem;
                                    lib.log('symbol: ' + val);
                                }
                            }
                            else {
                                lastItem += val;
                                Calc.currentString[Calc.currentString.length - 1] = lastItem;
                                lib.log('symbol: ' + val);
                            }
                        }
                    }
                    else {//если: +,-,*,/
                        if (lastItem.length > 0 && lastItem != '+' && lastItem != '-' && lastItem != '*' && lastItem != '/') {
                            Calc.currentString[Calc.currentString.length - 1] = lastItem;
                            Calc.currentString.push(val);//записать операнд в новый элемент массива
                            lib.log('operation: ' + val);
                        }
                    }
                    lib.log('res: ' + lastItem + '; length: ' + lastItem.length);

                    $(Calc.options.calcId + " .screen_text").text(Calc.currentString.join(""));
                }
                else {//если =   
                    if (lastItem.indexOf('=') == -1 && Calc.currentString.length >= 3) {
                        //разбиение на массивы чисел и знаков
                        var values = [];
                        var operations = [];
                        var res;
                        for (var i = 0; i < Calc.currentString.length; i++) {
                            if ($.isNumeric(Calc.currentString[i])) {
                                values.push(Number(Calc.currentString[i]));
                            }
                            else {
                                operations.push(Calc.currentString[i]);
                            }
                        }
                        lib.log('VALUES:');
                        for (var i = 0; i < values.length; i++) {
                            lib.log(values[i]);
                        }
                        lib.log('OPERATIONS:');
                        for (var i = 0; i < operations.length; i++) {
                            lib.log(operations[i]);
                        }

                        /*прохожусь по массиву операций и выполняю соответствующие операции над соответствующими цифрами;
                        результат каждой операции присваиваю во второй операнд этой операции, таким образом:
                        для каждой следующей операции - левый операнд это результат всех предыдущих операций,
                        а последний элемент в массиве values, после выполнение цикла, и будет результат всех операций*/
                        for (var i = 0; i < operations.length; i++) {
                            var operationRes;
                            var operation = operations[i];
                            switch (operation) {
                                case '+':
                                    operationRes = values[i] + values[i + 1];
                                    break;
                                case '-':
                                    operationRes = values[i] - values[i + 1];
                                    break;
                                case '*':
                                    operationRes = values[i] * values[i + 1];
                                    break;
                                case '/':
                                    operationRes = values[i] / values[i + 1];
                                    break;
                            }
                            values[i + 1] = operationRes;
                            lib.log('RES: ' + values[i + 1]);
                        }
                        res = values[values.length - 1];
                        Calc.currentString.push("=");
                        Calc.currentString.push(res);
                        $(Calc.options.calcId + " .screen_text").text(Calc.currentString.join(""));
                    }
                }
            });
        }
    }

    Calc.init("#calc1");
    Calc.process_click();

    //ДИНАМИЧЕСКИЙ ВЫПАДАЮЩИЙ СПИСОК(работоспособность проверена в браузере Google Chrome)
    var DynamicList = {
        options: {
            parentId: '', childId: ''
        },
        init: function (options) {
            DynamicList.options = $.extend(true, DynamicList.options, options);
            DynamicList.process();
        },
        process: function () {
            var parent = DynamicList.options.parentId;
            var child = DynamicList.options.childId;
            DynamicList.ajaxSend('/Products/GetCategories', {}, function (data) { lib.log('Callback for categories'); DynamicList.appendAjaxRes(parent, data); });
            $(parent).change(function () {
                var categoryId = $(parent + ' option:selected').val();
                lib.log(categoryId);
                DynamicList.ajaxSend('/Products/ProductsByCategory', { category_id: categoryId }, function (data) { lib.log('Callback for products'); DynamicList.appendAjaxRes(child, data) });
            });
        },
        ajaxSend: function (url, _data, callBack) {
            lib.log(_data);
            lib.log('I am in ajax: ' + url.toString());
            $.ajax({
                type: 'POST',
                url: url,
                //contentType: 'application/json; charset=utf­8',//при конвертации в json не передает простые параметры в action(только обьект)
                cache: false,
                data: _data,
                dataType: 'json',
                success: function (data, status) {
                    var response = data;
                    if (callBack) {
                        callBack(response);
                    }
                },
                complete: function () {
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Content­type', 'application/json; charset=utf­8');
                }
            });
        },
        appendAjaxRes: function (tag, data) {
            lib.log('I am in appendAjaxRes');
            lib.log(data);
            lib.log(tag);

            //remove from prevoius loading except default option
            $(tag + ' option').filter(function () { return ($(this).attr('id')) != 'default'; }).remove();

            $.each(data, function (index, val) {
                lib.log(val.Name);
                var htmlVal = [];
                htmlVal.push('<option value="'); htmlVal.push(val.Id); htmlVal.push('">');
                htmlVal.push(val.Name); htmlVal.push('</option>');
                var htmlVal = htmlVal.join("");
                lib.log(htmlVal);
                $(tag).append(htmlVal);
            });

            //remove disabled attribute if present
            var disableAttr = $(tag).attr('disabled');
            if (typeof disableAttr !== typeof undefined && disableAttr !== false) {
                $(tag).removeAttr('disabled');
            }

        }
    };
    DynamicList.init({ parentId: "#Category", childId: "#Product" });


    //Таймер
    var Timer = {
        timerId: '',
        startSelector: '',
        stopSelector: '',
        clockSelector: '',
        hours: 0,
        minutes: 0,
        seconds: 0,
        options: {
            target: ''
        },
        init: function (options) {
            Timer.options = $.extend(Timer.options, options);
            Timer.startSelector = Timer.options.target + ' #start';
            Timer.stopSelector = Timer.options.target + ' #stop';
            Timer.clockSelector = Timer.options.target + ' #clock';
            $(Timer.startSelector).click(function () {
                lib.log('start fired');
                Timer.start();
                $(Timer.options.target + ' #clock').html(Timer.hours + ' : ' + Timer.minutes + ' : ' + Timer.seconds);
            });
            $(Timer.stopSelector).click(function () {
                lib.log('stop fired');
                Timer.stop();
            });
        },
        start: function () {
            lib.log('I am in start');
            Timer.toggleButton(Timer.startSelector);
            Timer.toggleButton(Timer.stopSelector);
            Timer.timerId = setInterval(Timer.callBack, 1000);
            lib.log('setInterval created');
        },
        stop: function () {
            lib.log('I am in stop');
            Timer.toggleButton(Timer.startSelector);
            Timer.toggleButton(Timer.stopSelector);
            clearInterval(Timer.timerId);
            Timer.seconds = 0; Timer.minutes = 0; Timer.hours = 0;
            lib.log('setInterval deleted');
        },
        callBack: function () {
            lib.log('I am in callback');
            Timer.increase();
        },
        increase: function () {
            lib.log(Timer.hours + ' : ' + Timer.minutes + ' : ' + Timer.seconds);
            Timer.seconds = Timer.seconds + 1;
            lib.log(Timer.seconds);
            if (Timer.seconds > 59) {
                Timer.seconds = 0;
                Timer.minutes++;
            }
            if (Timer.minutes > 59) {
                Timer.minutes = 0;
                Timer.hours++;
            }
            Timer.display();
        },
        display: function () {
            lib.log('I am in display');
            $(Timer.clockSelector).html(Timer.hours + ' : ' + Timer.minutes + ' : ' + Timer.seconds);
        },
        toggleButton: function (target) {
            lib.log(target + ' has disabled: ' + $(target).is(':disabled'));
            if (!$(target).is(':disabled'))
                $(target).attr('disabled', 'disabled');
            else
                $(target).removeAttr('disabled');
        }
    };

    Timer.init({ target: '#task4' });

    $('.task0 p+div').filter(
        function () {
            console && lib.log($(this).prev('p').has('input[type=checkbox]:checked').text() == "");
            if ($(this).prev('p').has('input[type=checkbox]:checked').text() != "") {
                return true;
            }
            else
                return false;
        }).css('background-color', 'yellow');

    $('#choose').change(function () {
        var element = $(this);
        var val = $('#choose option:selected').val();
        alert(val);
        $('#val option[value=' + val + ']').prop('selected', true);
    });

    $('.btnToggle').click(function (e) {
        e.preventDefault();
        var boxes = $('.toggle input[type="checkbox"]');
        boxes.each(function () {
            var item = $(this);
            if (!item.is('checked')) {
                item.prop('checked', true);//attr('checked','checked');
            }

        });
    });
});