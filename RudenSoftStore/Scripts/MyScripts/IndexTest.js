$(document).ready(function () {
    var lib = {
        log: function (message, options) {
            //If options is null, undefined or 0, this code will set it to "{}"
            options = options || {};
            console && console.log(message)
        } 
    };

    //добавление элементов на страницу по кнопке 
    var compAdder = {
        options: {
            componentTypes: []//listed element types
        },
        init: function (options) {
            compAdder.options = $.extend(compAdder.options, options);
        },
        add: function (compTag, content, quantity, inline, destionation) {
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
    };

    compAdder.init(['p', 'b', 'div', 'span', 'a']);
    $('.AddElement').click(function (e) {
        e.preventDefault();
        compAdder.add('span', 'something', 3, true, '#task1');
    });

    //Калькулятор (не реализована приоритетность операций)
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
                if (Calc.currentString[Calc.currentString.length - 2] == '=')
                {
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
                        if (val == '.' ) {
                            if (lastItem.indexOf('.') == -1 && lastItem.length > 0)
                            {
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
                    if (lastItem.indexOf('=') == -1 && Calc.currentString.length >= 3)
                    {
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

    //Динамически сформированный выпадающий список 


    $('.task1 p+div').filter(
        function () {
            console && console.log($(this).prev('p').has('input[type=checkbox]:checked').text() == "");
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