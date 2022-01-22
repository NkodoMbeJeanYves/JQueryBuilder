$(document).ready(function() {
  const options = {
    allow_empty: true,
    /* operators: [
          'equal', 'not_equal', 'is_null',
           { type: 'plus', optgroup: 'custom', nb_inputs: 1, multiple: false, apply_to: ['number', 'string'] },
           { type: 'moins', optgroup: 'custom', nb_inputs: 1, multiple: false, apply_to: ['number', 'string'] },
        ], */
    filters: [
      {
        type: 'string',
        label: 'Firstname',
        // optgroup: 'core',
        default_value: 'expandis',
        size: 30,
        unique: true,
        id: 'Firstname'
      }, {
        type: 'string',
        label: 'Lastname',
        // optgroup: 'core',
        default_value: 'yves',
        operators: ['equal', 'not_equal', 'in', 'not_in', 'is_null', 'is_not_null'],
        size: 30,
        unique: true,
        id: 'LastName',
        input_event: 'blur, focus, click'
      }, {
        id: 'category',
        label: 'Category',
        type: 'integer',
        input: 'select',
        values: {
          1: 'Books',
          2: 'Movies',
          3: 'Music',
          4: 'Tools',
          5: 'Goodies',
          6: 'Clothes'
        }
      }, {
        type: 'string',
        id: 'code_action',
        field: 'sent',
        label: 'a recu',
        // values: {
        //   sent: 'a recu',
        //   clic_unique: 'a cliqué une fois',
        //   clic: 'a cliqué à maintes reprises',
        //   open: 'a ouvert',
        //   soft: 'a bloqué soft',
        //   hard: 'a bloqué hard'
        // },
        input: (rule, name) => {
          const $container = rule.$el.find('.rule-value-container')
          console.log(rule)
          rule.data = { ...{ field: rule.filter.field } }
          return `
            <div class="col-12">
                <input id="${name}_1" type="number" placeholder="" class="form-control" data-field="campaign_count" name="${name}_1" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\\..*)\\./g, '$1')">
                <label for="${name}_1">campagnes</label>
            </div>
            
            <div class="col-md-4">
            <label for="${name}_2">&nbsp;</label>
                <select class="form-control" data-field="campaign_channel" name="${name}_2"> 
                    <option value="null">-</option> 
                    <option value="sms">SMS</option> 
                    <option value="emailing">Emailing</option> 
                    <option value="mail">Courrier</option>
                </select>
            </div>
            <div class="col-md-4">
                <label for="${name}_3">&nbsp;</label>
                <select class="form-control" data-field="campaign_criteria" name="${name}_3" style="display:block;">
                    <option value="null">-</option> 
                    <option value="sur les">Sur les</option> 
                    <option value="avant les">Avant les</option> 
                </select>
            </div>
            <div class="col-md-4">
                <label for="${name}_4" class="form-label">derniers jours</label>
                <input type="number" class="form-control" data-field="campaign_delay" name="${name}_4" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\\..*)\\./g, '$1')">
            </div>
            
        `
        },
        valueGetter: function (rule) {
          const obj = {}
          obj[rule.$el.find('.rule-value-container [name$=_1]').data('field')] = rule.$el.find('.rule-value-container [name$=_1]').val()
          obj[rule.$el.find('.rule-value-container [name$=_2]').data('field')] = rule.$el.find('.rule-value-container [name$=_2]').val()
          obj[rule.$el.find('.rule-value-container [name$=_3]').data('field')] = rule.$el.find('.rule-value-container [name$=_3]').val()
          obj[rule.$el.find('.rule-value-container [name$=_4]').data('field')] = rule.$el.find('.rule-value-container [name$=_4]').val()
          return obj
        },
        valueSetter: function (rule, value) {
          if (rule.operator.nb_inputs > 0) {
            rule.$el.find('.rule-value-container [name$=_1]').val(value[rule.$el.find('.rule-value-container [name$=_1]').data('field')])// .trigger('change')
            rule.$el.find('.rule-value-container [name$=_2]').val(value[rule.$el.find('.rule-value-container [name$=_2]').data('field')])// .trigger('change')
            rule.$el.find('.rule-value-container [name$=_3]').val(value[rule.$el.find('.rule-value-container [name$=_3]').data('field')])
            rule.$el.find('.rule-value-container [name$=_4]').val(value[rule.$el.find('.rule-value-container [name$=_4]').data('field')])
          }
        }
      }, {
        type: 'string',
        id: 'custom',
        field: 'my-operator',
        operators: ['equal', 'between'],
        label: 'customLabel',
        default_value: 'customValue',
        input: function (rule, name) {
          var $container = rule.$el.find('.rule-value-container')
          // $rule.$el is the current li filter item whick contains rule-filter-container, rule-operator-container and rule-value-container
          rule.data = { field1: 'value1', operator: rule.operator.type }
          console.log(rule, name, rule.$el)
          $container.on('change', '[name=' + name + '_1]', function () {
            let h = ''
            switch ($(this).val()) {
              case 'A':
                h = '<option value="-1">-</option> <option value="1">1</option> <option value="2">2</option>'
                break
              case 'B':
                h = '<option value="-1">-</option> <option value="3">3</option> <option value="4">4</option>'
                break
              case 'C':
                h = '<option value="-1">-</option> <option value="5">5</option> <option value="6">6</option>'
                break
            }

            $container.find('[name$=_2]')
              .html(h).css('display', 'block')
              // .val('-1').trigger('change')
              /* if(rule.$el.find('[name$=_2]').length === 0) {
                rule.$el.append('<hr id="hr_1" class="hr_1">')
                rule.$el.find('.hr_1').after(`<select name="${name}_2" style="display:block;">${h}</select>`).toggle(!!h).val('-1')
              } else {
                rule.$el.find('[name$=_2]').html(h).val('-1').css('display', 'block')
              } */
          })

          $container.on('change', '[name$=_2]', function () {
            let h = ''
            switch ($(this).val()) {
              case '1':
                h = '<option value="-1">-</option> <option selected value="1">1</option> <option value="2">2</option>'
                break
              case '3':
                h = '<option value="-1">-</option> <option value="3">3</option> <option value="4">4</option>'
                break
              case '5':
                h = '<option value="-1">-</option> <option value="5">5</option> <option value="6">6</option>'
                break
            }

            $container.find('[name=' + name + '_3]')
              .html(h).css('display', 'block')
              // .val('-1').trigger('change')
            // rule.$el.find('.rule-filter-container').first().append(`<br><select name="${name}_2" style="display:block;">${h}</select>`)
          })
          return `
            <div class="row">
              <div class="col-md-4">
                  <input type="number" class="form-control" data-field="campaign_count" name="${name}_1" oninput="this.value = this.value.replace(/[^0-9]/g, '').replace(/(\\..*)\\./g, '$1')">
                  <select class="form-control" data-field="channel" name="${name}_2"> 
                    <option value="null">-</option> 
                    <option value="sms">SMS</option> 
                    <option value="emailing">Emailing</option> 
                    <option value="mail">Courrier</option>
                  </select>
              </div>
              <div class="col-md-4">
                  <select class="form-control" name="${name}_3" style="display:block;"></select>
              </div>
              <div class="col-md-4">
                  <select class="form-control" name="${name}_4" style="display:block;"></select> 
              </div>
          </div>
          `
        },
        valueGetter: function (rule) {
          // return rule.$el.find('.rule-value-container [name$=_1]').val() +
          // '.' + rule.$el.find('.rule-value-container [name$=_2]').val() +
          // '.' + rule.$el.find('.rule-value-container [name$=_3]').val()
          const obj = {}
          obj.value1 = rule.$el.find('.rule-value-container [name$=_1]').val()
          obj.value2 = rule.$el.find('.rule-value-container [name$=_2]').val()
          obj.value3 = rule.$el.find('.rule-value-container [name$=_3]').val()

          return obj
        },
        valueSetter: function (rule, value) {
          if (rule.operator.nb_inputs > 0) {
            var val = value
            /* let obj = {}
            obj['value1'] = rule.$el.find('.rule-value-container [name$=_1]').val()
            obj['value2'] = rule.$el.find('.rule-value-container [name$=_2]').val()
            obj['value3'] = rule.$el.find('.rule-value-container [name$=_3]').val() */
            rule.$el.find('.rule-value-container [name$=_1]').val(val.value1)// .trigger('change')
            rule.$el.find('.rule-value-container [name$=_2]').val(val.value2)// .trigger('change')
            rule.$el.find('.rule-value-container [name$=_3]').val(val.value3)
          }
        }
      }
    ]
  }

  $('#builder').queryBuilder(options)
  // var last_node_model = $('#builder').queryBuilder('getModel', $('#builder .rule-container').last())

  /* $('.parse-json').on('click', function () {
      console.log(JSON.stringify(
        $('#builder').queryBuilder('getMongo'),
        undefined, 2
      ))
    }) */
  $('.parse-json').on('click', function() {
    var res = $('#builder').queryBuilder('getSQL', $(this).data('stmt'), false)
    let val = res.sql + (res.params ? '\n\n' + JSON.stringify(res.params, undefined, 2) : '')
    var result = $('#builder').queryBuilder('getRules');

    if ($('#result').hasClass('hide')) {
      $('#result').removeClass('hide')
    }
    // $('#result > pre').first().text(val)
    $('#result > pre').first().text(JSON.stringify(result, null, 2))
  })
})
