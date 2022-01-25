$(document).ready(function () {
  const options = {
    allow_empty: true,
    filters: [
      {
        type: 'string',
        id: 'code_action',
        field: 'sent',
        label: 'A recu',
        operators: ['less', 'greater'],
        validation: {
          callback: (value, rule) => {
            const errors = []
            const $container = rule.$el.find('.rule-value-container')
            // campaign_count
            const campaignCountElement = $container.find('[name$=_1]')
            if (!(campaignCountElement.val()).trim()) {
              errors.push('The campaign count field is required')
              rule.data.validationErrors = errors
              return 'The campaign count field is required'
            }

            // campaign_type
            const campaignTypeElement = $container.find('[name$=_2]')
            if (!(campaignTypeElement.val()).trim()) {
              errors.push('The campaign Type field is required')
              rule.data.validationErrors = errors
              return 'The campaign Type field is required'
            }

            const campaignCriteriaElement = $container.find('[name$=_3]')
            if ((campaignCriteriaElement.val()).includes('sur les') && !($container.find('[name$=_4]').val()).trim()) {
              errors.push('The campaign delay field is required')
              rule.data.validationErrors = errors
              return 'The campaign delay field is required'
            }

            if ((campaignCriteriaElement.val()).includes('depuis le') && !($container.find('[name$=_5]').val()).trim()) {
              errors.push('The campaign date delay field is required')
              rule.data.validationErrors = errors
              return 'The campaign date delay field is required'
            }
            return true
          }
        },
        input: (rule, name) => {
          const operatorsContainer = rule.$el.find('.rule-operator-container')
          const options = operatorsContainer.children().first().children('option')
          $(options[0]).text('Moins de')
          $(options[1]).text('Plus de')
          rule.data = { ...{ field: rule.filter.field } }
          return `
            <div class="col-12">
                <input id="${name}_1" type="text" placeholder="" class="form-control" data-field="campaign_count" name="${name}_1" oninput="this.value = this.value.replace(/[^0-9]/g, '')">
                <label for="${name}_1">campagnes</label>
            </div>
            <div class="col-12">
              <span>
                <select class="form-control" data-field="campaign_channel" style="display:block" id="${name}_2" name="${name}_2"> 
                  <option value="emailing">Emailing</option> 
                  <option value="sms">SMS</option> 
                </select>
              </span>
              <span>
                <select class="form-control" data-field="campaign_criteria" name="${name}_3" style="display:block;"> 
                    <option value="sur les" selected>Sur les</option> 
                    <option value="depuis le">Depuis le</option> 
                </select>
              </span>
              <span>
                <span><input type="text" class="form-control ${name}_4" style="display:block;" data-field="campaign_delay" name="${name}_4" oninput="this.value = this.value.replace(/[^0-9]/g, '')"></span>
                <label for="${name}_4" class="form-label ${name}_4" style="display:block;">derniers jours</label>
                <span><input type="date" class="form-control" style="display:block;" data-field="campaign_before_date" name="${name}_5"></span>
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

  // $('#builder_m').queryBuilder(options).validate()
  $('#builder_m').queryBuilder(options)

  $('.parse-json').on('click', function () {
    var res = $('#builder_m').queryBuilder('getSQL', $(this).data('stmt'), false)
    let val = res.sql + (res.params ? '\n\n' + JSON.stringify(res.params, undefined, 2) : '')
    var result = $('#builder_m').queryBuilder('getRules');

    if ($('#result').hasClass('hide')) {
      $('#result').removeClass('hide')
    }

    $('#result > pre').first().text(val)
    // $('#result > pre').first().text(JSON.stringify(result, null, 4))
  })

  $('.reset').on('click', function () {
    $('#builder_m').queryBuilder('reset')
  })
})
