const payload =
  {
    comportementaux: {},
    marketings: {},
    declaratifs: {}
  }
$(document).ready(function () {
  const options = {
    allow_empty: true,
    /* operators: [
      'equal', 'not_equal', 'is_null',
      { type: 'david', nb_inputs: 1, multiple: false, apply_to: ['number'] },
      { type: 'less' || 'Moins de', nb_inputs: 1, multiple: false, apply_to: ['number'] }
    ], */
    filters: [
      {
        type: 'string',
        id: 'code_action',
        field: 'sent',
        label: 'A recu',
        operators: ['less', 'greater'],
        // values: {
        //   sent: 'a recu',
        //   clic_unique: 'a cliqué une fois',
        //   clic: 'a cliqué à maintes reprises',
        //   open: 'a ouvert',
        //   soft: 'a bloqué soft',
        //   hard: 'a bloqué hard'
        // },
        input: (rule, name) => {
          var $container = rule.$el.find('.rule-value-container')

          $container.on('input', '[name$=_1]', function () {
            if (!($(this).val()).trim()) {
              $container.find('[name$=_2]')
                .css('display', 'none').val(null)
            } else {
              $container.find('[name$=_2]')
                .css('display', 'block')
            }
          })

          $container.on('change', '[name$=_2]', function () {
            const options = ['sms', 'emailing']
            if (!options.includes($(this).val())) {
              $container.find('[name$=_3]')
                .css('display', 'none').val(null)
            } else {
              $container.find('[name$=_3]')
                .css('display', 'block')
            }
          })

          $container.on('change', '[name$=_3]', function () {
            switch ($(this).val()) {
              case 'sur les':
                $container.find('.' + name + '_4')
                  .css('display', 'block')
                $container.find('[name$=_5]')
                  .css('display', 'none').val(null)
                break
              case 'depuis le':
                $container.find('[name$=_5]')
                  .css('display', 'block')
                $container.find('.' + name + '_4')
                  .css('display', 'none').val(null)
                break
              default:
                $container.find('.' + name + '_4')
                  .css('display', 'none').val(null)
                $container.find('[name$=_5]')
                  .css('display', 'none').val(null)
            }
          })
          rule.data = { ...{ field: rule.filter.field } }
          return `
            <div class="col-12">
                <input id="${name}_1" type="text" placeholder="" class="form-control" data-field="campaign_count" name="${name}_1" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                <label for="${name}_1">campagnes</label>
            </div>
            <div class="col-12">
              <span>
                <select class="form-control" data-field="campaign_channel" style="display:none" id="${name}_2" name="${name}_2"> 
                    <option value="null">-</option> 
                    <option value="sms">SMS</option> 
                    <option value="emailing">Emailing</option> 
                </select>
              </span>
              <span>
                <select class="form-control" data-field="campaign_criteria" name="${name}_3" style="display:none;">
                    <option value="null">-</option> 
                    <option value="sur les">Sur les</option> 
                    <option value="depuis le">Depuis le</option> 
                </select>
              </span>
              <span>
                <span><input type="text" class="form-control ${name}_4" style="display:none;" data-field="campaign_delay" name="${name}_4" oninput="this.value = this.value.replace(/[^0-9]/g, '')"></span>
                <label for="${name}_4" class="form-label ${name}_4" style="display:none;">derniers jours</label>
                <span><input type="date" class="form-control" style="display:none;" data-field="campaign_before_date" name="${name}_5"></span>
              </span>
            </div>
            
            
            
            
        `
        },
        valueGetter: function (rule) {
          const obj = {}
          obj[rule.$el.find('.rule-value-container [name$=_1]').data('field')] = rule.$el.find('.rule-value-container [name$=_1]').val()
          obj[rule.$el.find('.rule-value-container [name$=_2]').data('field')] = rule.$el.find('.rule-value-container [name$=_2]').val()
          obj[rule.$el.find('.rule-value-container [name$=_3]').data('field')] = rule.$el.find('.rule-value-container [name$=_3]').val()
          obj[rule.$el.find('.rule-value-container [name$=_4]').data('field')] = rule.$el.find('.rule-value-container [name$=_4]').val()
          obj[rule.$el.find('.rule-value-container [name$=_5]').data('field')] = rule.$el.find('.rule-value-container [name$=_5]').val()
          return obj
        },
        valueSetter: function (rule, value) {
          if (rule.operator.nb_inputs > 0) {
            rule.$el.find('.rule-value-container [name$=_1]').val(value[rule.$el.find('.rule-value-container [name$=_1]').data('field')])// .trigger('change')
            rule.$el.find('.rule-value-container [name$=_2]').val(value[rule.$el.find('.rule-value-container [name$=_2]').data('field')])// .trigger('change')
            rule.$el.find('.rule-value-container [name$=_3]').val(value[rule.$el.find('.rule-value-container [name$=_3]').data('field')])
            rule.$el.find('.rule-value-container [name$=_4]').val(value[rule.$el.find('.rule-value-container [name$=_4]').data('field')])
            rule.$el.find('.rule-value-container [name$=_5]').val(value[rule.$el.find('.rule-value-container [name$=_5]').data('field')])
          }
        }
      }
    ]
  }

  $('#builder_m').queryBuilder(options)
  // var last_node_model = $('#builder').queryBuilder('getModel', $('#builder .rule-container').last())

  /* $('.parse-json').on('click', function () {
      console.log(JSON.stringify(
        $('#builder').queryBuilder('getMongo'),
        undefined, 2
      ))
    }) */
  $('.parse-json').on('click', function() {
    var res = $('#builder_m').queryBuilder('getSQL', $(this).data('stmt'), false)
    let val = res.sql + (res.params ? '\n\n' + JSON.stringify(res.params, undefined, 2) : '')
    var result = $('#builder_m').queryBuilder('getRules');

    if ($('#result').hasClass('hide')) {
      $('#result').removeClass('hide')
    }
    //$('#result > pre').first().text(val)
    // payload.marketings = JSON.stringify(result, null, 2)
    $('#result > pre').first().text(JSON.stringify(result, null, 4))// (JSON.stringify(result, null, 2))
  })
})
