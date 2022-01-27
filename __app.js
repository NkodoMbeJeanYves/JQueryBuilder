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

function validateBuilder(id = null) {
  /* const last_node_model = $('#builder_b').queryBuilder('getModel', $('#builder_b .rule-container').first())
  
  if (last_node_model.error === null) {
    $('#builder_b_error').css('display', 'none').text('')
  } else {
    $('#builder_b_error').css('display', 'block').text(`${last_node_model.error[0] == 'no_filter' ? 'Veuillez définir un filtre' : last_node_model.error[0] }`)
  } */
  console.log('say hello')
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
              return 'Veuillez spécifier un type de campagne.'
            }

            const campaignNameElement = $container.find('[name$=_2]')
            if (!(campaignNameElement.val())?.trim()) {
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
              return 'Veuillez spécifier un type de campagne.'
            }

            const campaignNameElement = $container.find('[name$=_2]')
            if (!(campaignNameElement.val())?.trim()) {
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
              return 'Veuillez spécifier un type de campagne.'
            }

            const campaignNameElement = $container.find('[name$=_2]')
            if (!(campaignNameElement.val())?.trim()) {
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
              return 'Veuillez spécifier un type de campagne.'
            }

            const campaignNameElement = $container.find('[name$=_2]')
            if (!(campaignNameElement.val())?.trim()) {
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
        label: 'A cliqué',
        size: 10,
        unique: true,
        id: 'behavior_5',
        operators: ['equal'],
        validation: {
          callback: (value, rule) => {
            const $container = rule.$el.find('.rule-value-container')

            const campaignCriteriaElement = $container.find('[name$=_2]')

            if (campaignCriteriaElement.val()?.includes('sur la campagne')) {
              // campaign_type
              const campaignTypeElement = $container.find('[name$=_3]')
              if (!campaignTypeElement.val()?.includes('sms') && !campaignTypeElement.val()?.includes('emailing')) {
                return 'Veuillez spécifier un type de campagne.'
              }

              const campaignNameElement = $container.find('[name$=_5]')
              if (!(campaignNameElement.val())?.trim()) {
                return 'Veuillez spécifier un nom de campagne'
              }
            }

            // campaign_count
            const campaignCountElement = $container.find('[name$=_4]')
            if (!(campaignCountElement.val())?.trim() || !parseInt(campaignCountElement.val())) {
              return 'Veuillez préciser un délai strictement positif'
            }

            return true
          }
        },
        input: (rule, name) => {
          // hide operator
          rule.$el.find('.rule-operator-container').css('display', 'none')

          // populate campaign names regarding campaign type
          var $container = rule.$el.find('.rule-value-container')

          $container.on('change', '[name$=_3]', function () {
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

            $container.find('[name$=_5]')
              .html(h)
          })

          $container.on('change', '[name$=_2]', function () {
            let h = ''
            switch ($(this).val()) {
              case 'sur une campagne':
                $container.find('[name$=_5], [name$=_3]')
                  .css('display', 'none').val(null)
                break
              case 'sur la campagne':
                $container.find('[name$=_5], [name$=_3]')
                  .css('display', 'block')
                break
            }
          })

          return `
            <select class="form-control" data-field="campaign_clic_count" style="display:block" id="${name}_1" name="${name}_1"> 
              <option value="Au moins une fois">Au moins une fois</option> 
              <option value="Une seule fois">une seule fois</option> 
            </select>

            <select class="form-control" data-field="campaign_criteria" id="${name}_2" name="${name}_2" style="display:block;">
              <option value="sur une campagne">sur une campagne</option>
              <option value="sur la campagne">sur la campagne</option>
            </select>

            <select class="form-control" data-field="campaign_type" id="${name}_3" name="${name}_3" style="display:none;">
              <option value="emailing">emailing</option>
              <option value="sms">sms</option>
            </select>

            <select class="form-control" data-field="campaign_id" id="${name}_5" name="${name}_5" style="display:none;">
            ${defaultCampaignEmailingNames}
            </select>

            <label for="${name}_4" class="form-label ${name}_4" style="display:block;">sur les</label>
            <span><input type="text" class="form-control ${name}_4" style="display:block;" placeholder="Exemple: 4" data-field="campaign_delay" name="${name}_4" oninput="this.value = this.value.replace(/[^0-9]/g, '')"></span>
            <label for="${name}_4" class="form-label ${name}_4" style="display:block;">derniers jours</label>
            
          `
        },
        valueGetter: function (rule) {
          const obj = {}
          obj[rule.$el.find('.rule-value-container [name$=_1]').data('field')] = rule.$el.find('.rule-value-container [name$=_1]').val()
          obj[rule.$el.find('.rule-value-container [name$=_2]').data('field')] = rule.$el.find('.rule-value-container [name$=_2]').val()
          if (!(rule.$el.find('.rule-value-container [name$=_2]').val()?.includes('sur une campagne'))) {
            obj[rule.$el.find('.rule-value-container [name$=_3]').data('field')] = rule.$el.find('.rule-value-container [name$=_3]').val()
            obj[rule.$el.find('.rule-value-container [name$=_5]').data('field')] = rule.$el.find('.rule-value-container [name$=_5]').val()
          }

          obj[rule.$el.find('.rule-value-container [name$=_4]').data('field')] = rule.$el.find('.rule-value-container [name$=_4]').val()
          return obj
        },
        valueSetter: function (rule, value) {
          if (rule.operator.nb_inputs > 0) {
            rule.$el.find('.rule-value-container [name$=_1]').val(value[rule.$el.find('.rule-value-container [name$=_1]').data('field')])
            rule.$el.find('.rule-value-container [name$=_2]').val(value[rule.$el.find('.rule-value-container [name$=_2]').data('field')])
            if (!(rule.$el.find('.rule-value-container [name$=_2]').val()?.includes('sur une campagne'))) {
              rule.$el.find('.rule-value-container [name$=_3]').val(value[rule.$el.find('.rule-value-container [name$=_3]').data('field')])
              rule.$el.find('.rule-value-container [name$=_5]').val(value[rule.$el.find('.rule-value-container [name$=_5]').data('field')])
            }

            rule.$el.find('.rule-value-container [name$=_4]').val(value[rule.$el.find('.rule-value-container [name$=_4]').data('field')])
          }
        }
      }, {
        type: 'string',
        label: 'N\'a pas cliqué',
        size: 10,
        unique: true,
        id: 'behavior_6',
        operators: ['equal'],
        validation: {
          callback: (value, rule) => {
            const $container = rule.$el.find('.rule-value-container')

            const campaignCriteriaElement = $container.find('[name$=_2]')

            if (campaignCriteriaElement.val()?.includes('sur la campagne')) {
              // campaign_type
              const campaignTypeElement = $container.find('[name$=_3]')
              if (!campaignTypeElement.val()?.includes('sms') && !campaignTypeElement.val()?.includes('emailing')) {
                return 'Veuillez spécifier un type de campagne.'
              }

              const campaignNameElement = $container.find('[name$=_5]')
              if (!(campaignNameElement.val())?.trim()) {
                return 'Veuillez spécifier un nom de campagne'
              }
            }

            // campaign_count
            const campaignCountElement = $container.find('[name$=_4]')
            if (!(campaignCountElement.val())?.trim() || !parseInt(campaignCountElement.val())) {
              return 'Veuillez préciser un délai strictement positif'
            }

            return true
          }
        },
        input: (rule, name) => {
          // hide operator
          rule.$el.find('.rule-operator-container').css('display', 'none')

          // populate campaign names regarding campaign type
          var $container = rule.$el.find('.rule-value-container')

          // default behavior, because "emailing" is set by default we need to set these values to null

          $container.on('change', '[name$=_3]', function () {
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

            $container.find('[name$=_5]')
              .html(h)
          })

          $container.on('change', '[name$=_2]', function () {
            let h = ''
            switch ($(this).val()) {
              case 'sur une campagne':
                $container.find('[name$=_5], [name$=_3]')
                  .css('display', 'none').val(null)
                break
              case 'sur la campagne':
                $container.find('[name$=_5], [name$=_3]')
                  .css('display', 'block')
                break
            }
          })

          return `
            <select class="form-control" data-field="campaign_criteria" id="${name}_2" name="${name}_2" style="display:block;">
              <option value="sur une campagne">sur une campagne</option>
              <option value="sur la campagne">sur la campagne</option>
            </select>

            <select class="form-control" data-field="campaign_type" id="${name}_3" name="${name}_3" style="display:none;">
              <option value="emailing">emailing</option>
              <option value="sms">sms</option>
            </select>

            <select class="form-control" data-field="campaign_id" id="${name}_5" name="${name}_5" style="display:none;">
            ${defaultCampaignEmailingNames}
            </select>

            <label for="${name}_4" class="form-label ${name}_4" style="display:block;">sur les</label>
            <span><input type="text" class="form-control ${name}_4" style="display:block;" placeholder="Exemple: 4" data-field="campaign_delay" name="${name}_4" oninput="this.value = this.value.replace(/[^0-9]/g, '')"></span>
            <label for="${name}_4" class="form-label ${name}_4" style="display:block;">derniers jours</label>
            
          `
        },
        valueGetter: function (rule) {
          const obj = {}
          obj[rule.$el.find('.rule-value-container [name$=_2]').data('field')] = rule.$el.find('.rule-value-container [name$=_2]').val()
          if (!(rule.$el.find('.rule-value-container [name$=_2]').val()?.includes('sur une campagne'))) {
            obj[rule.$el.find('.rule-value-container [name$=_3]').data('field')] = rule.$el.find('.rule-value-container [name$=_3]').val()
            obj[rule.$el.find('.rule-value-container [name$=_5]').data('field')] = rule.$el.find('.rule-value-container [name$=_5]').val()
          }

          obj[rule.$el.find('.rule-value-container [name$=_4]').data('field')] = rule.$el.find('.rule-value-container [name$=_4]').val()
          return obj
        },
        valueSetter: function (rule, value) {
          if (rule.operator.nb_inputs > 0) {
            rule.$el.find('.rule-value-container [name$=_2]').val(value[rule.$el.find('.rule-value-container [name$=_2]').data('field')])
            if (!(rule.$el.find('.rule-value-container [name$=_2]').val()?.includes('sur une campagne'))) {
              rule.$el.find('.rule-value-container [name$=_3]').val(value[rule.$el.find('.rule-value-container [name$=_3]').data('field')])
              rule.$el.find('.rule-value-container [name$=_5]').val(value[rule.$el.find('.rule-value-container [name$=_5]').data('field')])
            }

            rule.$el.find('.rule-value-container [name$=_4]').val(value[rule.$el.find('.rule-value-container [name$=_4]').data('field')])
          }
        }
      }, {
        type: 'string',
        label: 'A ouvert',
        size: 10,
        unique: true,
        id: 'behavior_7',
        operators: ['equal'],
        validation: {
          callback: (value, rule) => {
            const $container = rule.$el.find('.rule-value-container')

            const campaignCriteriaElement = $container.find('[name$=_2]')

            if (campaignCriteriaElement.val()?.includes('sur la campagne')) {
              // campaign_type
              const campaignTypeElement = $container.find('[name$=_3]')
              if (!campaignTypeElement.val()?.includes('sms') && !campaignTypeElement.val()?.includes('emailing')) {
                return 'Veuillez spécifier un type de campagne.'
              }

              const campaignNameElement = $container.find('[name$=_5]')
              if (!(campaignNameElement.val())?.trim()) {
                return 'Veuillez spécifier un nom de campagne'
              }
            }

            // campaign_count
            const campaignCountElement = $container.find('[name$=_4]')
            if (!(campaignCountElement.val())?.trim() || !parseInt(campaignCountElement.val())) {
              return 'Veuillez préciser un délai strictement positif'
            }

            return true
          }
        },
        input: (rule, name) => {
          // hide operator
          rule.$el.find('.rule-operator-container').css('display', 'none')

          // populate campaign names regarding campaign type
          var $container = rule.$el.find('.rule-value-container')

          $container.on('change', '[name$=_3]', function () {
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

            $container.find('[name$=_5]')
              .html(h)
          })

          $container.on('change', '[name$=_2]', function () {
            let h = ''
            switch ($(this).val()) {
              case 'sur une campagne':
                $container.find('[name$=_5], [name$=_3]')
                  .css('display', 'none').val(null)
                break
              case 'sur la campagne':
                $container.find('[name$=_5], [name$=_3]')
                  .css('display', 'block')
                break
            }
          })

          return `
            <select class="form-control" data-field="campaign_clic_count" style="display:block" id="${name}_1" name="${name}_1"> 
              <option value="Au moins une fois">Au moins une fois</option> 
              <option value="Une seule fois">une seule fois</option> 
            </select>

            <select class="form-control" data-field="campaign_criteria" id="${name}_2" name="${name}_2" style="display:block;">
              <option value="sur une campagne">sur une campagne</option>
              <option value="sur la campagne">sur la campagne</option>
            </select>

            <select class="form-control" data-field="campaign_type" id="${name}_3" name="${name}_3" style="display:none;">
              <option value="emailing">emailing</option>
              <option value="sms">sms</option>
            </select>

            <select class="form-control" data-field="campaign_id" id="${name}_5" name="${name}_5" style="display:none;">
            ${defaultCampaignEmailingNames}
            </select>

            <label for="${name}_4" class="form-label ${name}_4" style="display:block;">sur les</label>
            <span><input type="text" class="form-control ${name}_4" style="display:block;" placeholder="Exemple: 4" data-field="campaign_delay" name="${name}_4" oninput="this.value = this.value.replace(/[^0-9]/g, '')"></span>
            <label for="${name}_4" class="form-label ${name}_4" style="display:block;">derniers jours</label>
            
          `
        },
        valueGetter: function (rule) {
          const obj = {}
          obj[rule.$el.find('.rule-value-container [name$=_1]').data('field')] = rule.$el.find('.rule-value-container [name$=_1]').val()
          obj[rule.$el.find('.rule-value-container [name$=_2]').data('field')] = rule.$el.find('.rule-value-container [name$=_2]').val()
          if (!(rule.$el.find('.rule-value-container [name$=_2]').val()?.includes('sur une campagne'))) {
            obj[rule.$el.find('.rule-value-container [name$=_3]').data('field')] = rule.$el.find('.rule-value-container [name$=_3]').val()
            obj[rule.$el.find('.rule-value-container [name$=_5]').data('field')] = rule.$el.find('.rule-value-container [name$=_5]').val()
          }

          obj[rule.$el.find('.rule-value-container [name$=_4]').data('field')] = rule.$el.find('.rule-value-container [name$=_4]').val()
          return obj
        },
        valueSetter: function (rule, value) {
          if (rule.operator.nb_inputs > 0) {
            rule.$el.find('.rule-value-container [name$=_1]').val(value[rule.$el.find('.rule-value-container [name$=_1]').data('field')])
            rule.$el.find('.rule-value-container [name$=_2]').val(value[rule.$el.find('.rule-value-container [name$=_2]').data('field')])
            if (!(rule.$el.find('.rule-value-container [name$=_2]').val()?.includes('sur une campagne'))) {
              rule.$el.find('.rule-value-container [name$=_3]').val(value[rule.$el.find('.rule-value-container [name$=_3]').data('field')])
              rule.$el.find('.rule-value-container [name$=_5]').val(value[rule.$el.find('.rule-value-container [name$=_5]').data('field')])
            }

            rule.$el.find('.rule-value-container [name$=_4]').val(value[rule.$el.find('.rule-value-container [name$=_4]').data('field')])
          }
        }
      }, {
        type: 'string',
        label: 'N\'a pas ouvert',
        size: 10,
        unique: true,
        id: 'behavior_8',
        operators: ['equal'],
        validation: {
          callback: (value, rule) => {
            const $container = rule.$el.find('.rule-value-container')

            const campaignCriteriaElement = $container.find('[name$=_2]')

            if (campaignCriteriaElement.val()?.includes('sur la campagne')) {
              // campaign_type
              const campaignTypeElement = $container.find('[name$=_3]')
              if (!campaignTypeElement.val()?.includes('sms') && !campaignTypeElement.val()?.includes('emailing')) {
                return 'Veuillez spécifier un type de campagne.'
              }

              const campaignNameElement = $container.find('[name$=_5]')
              if (!(campaignNameElement.val())?.trim()) {
                return 'Veuillez spécifier un nom de campagne'
              }
            }

            // campaign_count
            const campaignCountElement = $container.find('[name$=_4]')
            if (!(campaignCountElement.val())?.trim() || !parseInt(campaignCountElement.val())) {
              return 'Veuillez préciser un délai strictement positif'
            }

            return true
          }
        },
        input: (rule, name) => {
          // hide operator
          rule.$el.find('.rule-operator-container').css('display', 'none')

          // populate campaign names regarding campaign type
          var $container = rule.$el.find('.rule-value-container')

          $container.on('change', '[name$=_3]', function () {
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

            $container.find('[name$=_5]')
              .html(h)
          })

          $container.on('change', '[name$=_2]', function () {
            let h = ''
            switch ($(this).val()) {
              case 'sur une campagne':
                $container.find('[name$=_5], [name$=_3]')
                  .css('display', 'none').val(null)
                break
              case 'sur la campagne':
                $container.find('[name$=_5], [name$=_3]')
                  .css('display', 'block')
                break
            }
          })

          return `
            <select class="form-control" data-field="campaign_criteria" id="${name}_2" name="${name}_2" style="display:block;">
              <option value="sur une campagne">sur une campagne</option>
              <option value="sur la campagne">sur la campagne</option>
            </select>

            <select class="form-control" data-field="campaign_type" id="${name}_3" name="${name}_3" style="display:none;">
              <option value="emailing">emailing</option>
              <option value="sms">sms</option>
            </select>

            <select class="form-control" data-field="campaign_id" id="${name}_5" name="${name}_5" style="display:none;">
            ${defaultCampaignEmailingNames}
            </select>

            <label for="${name}_4" class="form-label ${name}_4" style="display:block;">sur les</label>
            <span><input type="text" class="form-control ${name}_4" style="display:block;" placeholder="Exemple: 4" data-field="campaign_delay" name="${name}_4" oninput="this.value = this.value.replace(/[^0-9]/g, '')"></span>
            <label for="${name}_4" class="form-label ${name}_4" style="display:block;">derniers jours</label>
            
          `
        },
        valueGetter: function (rule) {
          const obj = {}
          obj[rule.$el.find('.rule-value-container [name$=_1]').data('field')] = rule.$el.find('.rule-value-container [name$=_1]').val()
          obj[rule.$el.find('.rule-value-container [name$=_2]').data('field')] = rule.$el.find('.rule-value-container [name$=_2]').val()
          if (!(rule.$el.find('.rule-value-container [name$=_2]').val()?.includes('sur une campagne'))) {
            obj[rule.$el.find('.rule-value-container [name$=_3]').data('field')] = rule.$el.find('.rule-value-container [name$=_3]').val()
            obj[rule.$el.find('.rule-value-container [name$=_5]').data('field')] = rule.$el.find('.rule-value-container [name$=_5]').val()
          }

          obj[rule.$el.find('.rule-value-container [name$=_4]').data('field')] = rule.$el.find('.rule-value-container [name$=_4]').val()
          return obj
        },
        valueSetter: function (rule, value) {
          if (rule.operator.nb_inputs > 0) {
            rule.$el.find('.rule-value-container [name$=_1]').val(value[rule.$el.find('.rule-value-container [name$=_1]').data('field')])
            rule.$el.find('.rule-value-container [name$=_2]').val(value[rule.$el.find('.rule-value-container [name$=_2]').data('field')])
            if (!(rule.$el.find('.rule-value-container [name$=_2]').val()?.includes('sur une campagne'))) {
              rule.$el.find('.rule-value-container [name$=_3]').val(value[rule.$el.find('.rule-value-container [name$=_3]').data('field')])
              rule.$el.find('.rule-value-container [name$=_5]').val(value[rule.$el.find('.rule-value-container [name$=_5]').data('field')])
            }

            rule.$el.find('.rule-value-container [name$=_4]').val(value[rule.$el.find('.rule-value-container [name$=_4]').data('field')])
          }
        }
      }, {
        type: 'string',
        label: 'S\'est désabonné suite à la campagne',
        size: 10,
        unique: true,
        id: 'behavior_9',
        operators: ['equal'],
        validation: {
          callback: (value, rule) => {
            const $container = rule.$el.find('.rule-value-container')

            const campaignNameElement = $container.find('[name$=_5]')
            if (!(campaignNameElement.val())?.trim()) {
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

          return `
            <select class="form-control" data-field="campaign_id" id="${name}_5" name="${name}_5" style="display:none;">
            ${defaultCampaignEmailingNames}
            </select>
          `
        },
        valueGetter: function (rule) {
          const obj = {}
          obj[rule.$el.find('.rule-value-container [name$=_5]').data('field')] = rule.$el.find('.rule-value-container [name$=_5]').val()
          return obj
        },
        valueSetter: function (rule, value) {
          if (rule.operator.nb_inputs > 0) {
            rule.$el.find('.rule-value-container [name$=_5]').val(value[rule.$el.find('.rule-value-container [name$=_5]').data('field')])
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
