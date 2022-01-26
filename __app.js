const data = {
  sms: [
    { id: 1, name: 'thomas_sms_' },
    { id: 2, name: 'thomas_sms_2' },
    { id: 3, name: 'thomas_sms_3' },
    { id: 4, name: 'thomas_sms_4' },
    { id: 5, name: 'thomas_sms_5' }
  ],
  emailing: [
    { id: 1, name: 'thomas_emailing_' },
    { id: 2, name: 'thomas_emailing_2' },
    { id: 3, name: 'thomas_emailing_3' },
    { id: 4, name: 'thomas_emailing_4' },
    { id: 5, name: 'thomas_emailing_5' }
  ]
}

// set campaign emailing names list on page load because emailing is show to user
// and we don't have an empty select value to force us triggering change event on campaign type select element
let defaultCampaignEmailingNames = '<option value="">-</option>'
data.emailing.forEach(el => {
  defaultCampaignEmailingNames += `<option value="${el.id}">${el.name}</option>`
})

const buildersErrorMessages = {}

$(document).ready(function () {
  // récupérer les noms de campagnes sms et Emailing
  var campaignEmailingNames, campaignSmsNames
  campaignEmailingNames = data.emailing
  campaignSmsNames = data.sms

  const options = {
    allow_empty: true,
    filters: [
      {
        type: 'string',
        label: 'A été destinataire de la campagne',
        size: 10,
        unique: true,
        id: 'behavior_1',
        operators: ['equal'],
        validation: {
          callback: (value, rule) => {
            const $container = rule.$el.find('.rule-value-container')
            buildersErrorMessages.marketing = ''
            // campaign_type
            const campaignTypeElement = $container.find('[name$=_1]')
            if (!campaignTypeElement.val()?.includes('sms') && !campaignTypeElement.val()?.includes('emailing')) {
              buildersErrorMessages.marketing = 'Veuillez spécifier un type de campagne.'
              return 'Veuillez spécifier un type de campagne.'
            }

            const campaignNameElement = $container.find('[name$=_2]')
            if (!(campaignNameElement.val())?.trim()) {
              buildersErrorMessages.marketing = 'Veuillez spécifier un nom de campagne'
              return 'Veuillez spécifier un nom de campagne'
            }

            return true
          }
        },
        input: (rule, name) => {
          // hide operator
          rule.$el.find('.rule-operator-container').css('display', 'none')

          // populate campaign names regarding campaign type
          var $container = rule.$el.find('.rule-value-container')

          $container.on('change', '[name$=_1]', function () {
            let h = ''
            switch ($(this).val()) {
              case 'emailing':
                h = '<option value="">-</option>'
                campaignEmailingNames.forEach(el => {
                  h += `<option value="${el.id}">${el.name}</option>`
                })
                break
              case 'sms':
                h = '<option value="">-</option>'
                campaignSmsNames.forEach(el => {
                  h += `<option value="${el.id}">${el.name}</option>`
                })
                break
            }

            $container.find('[name$=_2]')
              .html(h)
          })

          return `
            <select class="form-control" data-field="campaign_channel" style="display:block" id="${name}_1" name="${name}_1"> 
              <option value="emailing">Emailing</option> 
              <option value="sms">SMS</option> 
            </select>
            <select class="form-control" data-field="campaign_id" id="${name}_2" name="${name}_2" style="display:block;">
            ${defaultCampaignEmailingNames}
            </select>
          `
        },
        valueGetter: function (rule) {
          const obj = {}
          obj[rule.$el.find('.rule-value-container [name$=_1]').data('field')] = rule.$el.find('.rule-value-container [name$=_1]').val()
          obj[rule.$el.find('.rule-value-container [name$=_2]').data('field')] = rule.$el.find('.rule-value-container [name$=_2]').val()
          return obj
        },
        valueSetter: function (rule, value) {
          if (rule.operator.nb_inputs > 0) {
            rule.$el.find('.rule-value-container [name$=_1]').val(value[rule.$el.find('.rule-value-container [name$=_1]').data('field')]).trigger('change')
            rule.$el.find('.rule-value-container [name$=_2]').val(value[rule.$el.find('.rule-value-container [name$=_2]').data('field')])
          }
        }
      }, {
        type: 'string',
        label: 'N\'a pas été destinataire de la campagne',
        size: 10,
        unique: true,
        id: 'behavior_2',
        operators: ['equal'],
        validation: {
          callback: (value, rule) => {
            const $container = rule.$el.find('.rule-value-container')
            buildersErrorMessages.marketing = ''
            // campaign_type
            const campaignTypeElement = $container.find('[name$=_1]')
            if (!campaignTypeElement.val()?.includes('sms') && !campaignTypeElement.val()?.includes('emailing')) {
              buildersErrorMessages.marketing = 'Veuillez spécifier un type de campagne.'
              return 'Veuillez spécifier un type de campagne.'
            }

            const campaignNameElement = $container.find('[name$=_2]')
            if (!(campaignNameElement.val())?.trim()) {
              buildersErrorMessages.marketing = 'Veuillez spécifier un nom de campagne'
              return 'Veuillez spécifier un nom de campagne'
            }

            return true
          }
        },
        input: (rule, name) => {
          // hide operator
          rule.$el.find('.rule-operator-container').css('display', 'none')

          // populate campaign names regarding campaign type
          var $container = rule.$el.find('.rule-value-container')

          $container.on('change', '[name$=_1]', function () {
            let h = ''
            switch ($(this).val()) {
              case 'emailing':
                h = '<option value="">-</option>'
                campaignEmailingNames.forEach(el => {
                  h += `<option value="${el.id}">${el.name}</option>`
                })
                break
              case 'sms':
                h = '<option value="">-</option>'
                campaignSmsNames.forEach(el => {
                  h += `<option value="${el.id}">${el.name}</option>`
                })
                break
            }

            $container.find('[name$=_2]')
              .html(h)
          })

          return `
            <select class="form-control" data-field="campaign_channel" style="display:block" id="${name}_1" name="${name}_1"> 
              <option value="emailing">Emailing</option> 
              <option value="sms">SMS</option> 
            </select>
            <select class="form-control" data-field="campaign_id" id="${name}_2" name="${name}_2" style="display:block;">
            ${defaultCampaignEmailingNames}
            </select>
          `
        },
        valueGetter: function (rule) {
          const obj = {}
          obj[rule.$el.find('.rule-value-container [name$=_1]').data('field')] = rule.$el.find('.rule-value-container [name$=_1]').val()
          obj[rule.$el.find('.rule-value-container [name$=_2]').data('field')] = rule.$el.find('.rule-value-container [name$=_2]').val()
          return obj
        },
        valueSetter: function (rule, value) {
          if (rule.operator.nb_inputs > 0) {
            rule.$el.find('.rule-value-container [name$=_1]').val(value[rule.$el.find('.rule-value-container [name$=_1]').data('field')]).trigger('change')
            rule.$el.find('.rule-value-container [name$=_2]').val(value[rule.$el.find('.rule-value-container [name$=_2]').data('field')])
          }
        }
      }, {
        type: 'string',
        label: 'A reçu la campagne',
        size: 10,
        unique: true,
        id: 'behavior_3',
        operators: ['equal'],
        validation: {
          callback: (value, rule) => {
            const $container = rule.$el.find('.rule-value-container')
            buildersErrorMessages.marketing = ''
            // campaign_type
            const campaignTypeElement = $container.find('[name$=_1]')
            if (!campaignTypeElement.val()?.includes('sms') && !campaignTypeElement.val()?.includes('emailing')) {
              buildersErrorMessages.marketing = 'Veuillez spécifier un type de campagne.'
              return 'Veuillez spécifier un type de campagne.'
            }

            const campaignNameElement = $container.find('[name$=_2]')
            if (!(campaignNameElement.val())?.trim()) {
              buildersErrorMessages.marketing = 'Veuillez spécifier un nom de campagne'
              return 'Veuillez spécifier un nom de campagne'
            }

            return true
          }
        },
        input: (rule, name) => {
          // hide operator
          rule.$el.find('.rule-operator-container').css('display', 'none')

          // populate campaign names regarding campaign type
          var $container = rule.$el.find('.rule-value-container')

          $container.on('change', '[name$=_1]', function () {
            let h = ''
            switch ($(this).val()) {
              case 'emailing':
                h = '<option value="">-</option>'
                campaignEmailingNames.forEach(el => {
                  h += `<option value="${el.id}">${el.name}</option>`
                })
                break
              case 'sms':
                h = '<option value="">-</option>'
                campaignSmsNames.forEach(el => {
                  h += `<option value="${el.id}">${el.name}</option>`
                })
                break
            }

            $container.find('[name$=_2]')
              .html(h)
          })

          return `
            <select class="form-control" data-field="campaign_channel" style="display:block" id="${name}_1" name="${name}_1"> 
              <option value="emailing">Emailing</option> 
              <option value="sms">SMS</option> 
            </select>
            <select class="form-control" data-field="campaign_id" id="${name}_2" name="${name}_2" style="display:block;">
            ${defaultCampaignEmailingNames}
            </select>
          `
        },
        valueGetter: function (rule) {
          const obj = {}
          obj[rule.$el.find('.rule-value-container [name$=_1]').data('field')] = rule.$el.find('.rule-value-container [name$=_1]').val()
          obj[rule.$el.find('.rule-value-container [name$=_2]').data('field')] = rule.$el.find('.rule-value-container [name$=_2]').val()
          return obj
        },
        valueSetter: function (rule, value) {
          if (rule.operator.nb_inputs > 0) {
            rule.$el.find('.rule-value-container [name$=_1]').val(value[rule.$el.find('.rule-value-container [name$=_1]').data('field')]).trigger('change')
            rule.$el.find('.rule-value-container [name$=_2]').val(value[rule.$el.find('.rule-value-container [name$=_2]').data('field')])
          }
        }
      }, {
        type: 'string',
        label: 'N\'a pas reçu la campagne',
        size: 10,
        unique: true,
        id: 'behavior_4',
        operators: ['equal'],
        validation: {
          callback: (value, rule) => {
            const $container = rule.$el.find('.rule-value-container')
            buildersErrorMessages.marketing = ''
            // campaign_type
            const campaignTypeElement = $container.find('[name$=_1]')
            if (!campaignTypeElement.val()?.includes('sms') && !campaignTypeElement.val()?.includes('emailing')) {
              buildersErrorMessages.marketing = 'Veuillez spécifier un type de campagne.'
              return 'Veuillez spécifier un type de campagne.'
            }

            const campaignNameElement = $container.find('[name$=_2]')
            if (!(campaignNameElement.val())?.trim()) {
              buildersErrorMessages.marketing = 'Veuillez spécifier un nom de campagne'
              return 'Veuillez spécifier un nom de campagne'
            }

            return true
          }
        },
        input: (rule, name) => {
          // hide operator
          rule.$el.find('.rule-operator-container').css('display', 'none')

          // populate campaign names regarding campaign type
          var $container = rule.$el.find('.rule-value-container')

          $container.on('change', '[name$=_1]', function () {
            let h = ''
            switch ($(this).val()) {
              case 'emailing':
                h = '<option value="">-</option>'
                campaignEmailingNames.forEach(el => {
                  h += `<option value="${el.id}">${el.name}</option>`
                })
                break
              case 'sms':
                h = '<option value="">-</option>'
                campaignSmsNames.forEach(el => {
                  h += `<option value="${el.id}">${el.name}</option>`
                })
                break
            }

            $container.find('[name$=_2]')
              .html(h)
          })

          return `
            <select class="form-control" data-field="campaign_channel" style="display:block" id="${name}_1" name="${name}_1"> 
              <option value="emailing">Emailing</option> 
              <option value="sms">SMS</option> 
            </select>
            <select class="form-control" data-field="campaign_id" id="${name}_2" name="${name}_2" style="display:block;">
            ${defaultCampaignEmailingNames}
            </select>
          `
        },
        valueGetter: function (rule) {
          const obj = {}
          obj[rule.$el.find('.rule-value-container [name$=_1]').data('field')] = rule.$el.find('.rule-value-container [name$=_1]').val()
          obj[rule.$el.find('.rule-value-container [name$=_2]').data('field')] = rule.$el.find('.rule-value-container [name$=_2]').val()
          return obj
        },
        valueSetter: function (rule, value) {
          if (rule.operator.nb_inputs > 0) {
            rule.$el.find('.rule-value-container [name$=_1]').val(value[rule.$el.find('.rule-value-container [name$=_1]').data('field')]).trigger('change')
            rule.$el.find('.rule-value-container [name$=_2]').val(value[rule.$el.find('.rule-value-container [name$=_2]').data('field')])
          }
        }
      }
    ]
  }

  $('#builder_b').queryBuilder(options)

  $('.parse-json').on('click', function () {
    var res = $('#builder_b').queryBuilder('getSQL', $(this).data('stmt'), false)
    let val = res.sql + (res.params ? '\n\n' + JSON.stringify(res.params, undefined, 2) : '')
    var result = $('#builder_b').queryBuilder('getRules');

    // display current builder error message
    const last_node_model = $('#builder_b').queryBuilder('getModel', $('#builder_b .rule-container').first())
    
    if (last_node_model.error === null) {
      $('#builder_b_error').css('display', 'none').text('')
    } else {
      $('#builder_b_error').css('display', 'block').text(`${last_node_model.error[0] == 'no_filter' ? 'Veuillez définir un filtre' : last_node_model.error[0] }`)
    }

    if ($('#result').hasClass('hide')) {
      $('#result').removeClass('hide')
    }
    //$('#result > pre').first().text(val)
    $('#result > pre').first().text(JSON.stringify(result, null, 4))
  })

  $('.reset').on('click', function () {
    $('#builder_b').queryBuilder('reset')
  })
})
