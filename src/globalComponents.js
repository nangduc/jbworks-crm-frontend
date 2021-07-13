/**
 * Vuely Global Components
 */

// perfect scroll bar
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar'

// App Card component
import AppCard from 'Components/AppCard/AppCard'

// App Card loader
import AppSectionLoader from 'Components/AppSectionLoader/AppSectionLoader'

// count up
import CountUp from 'Components/CountUp/CountUp'

// Delete Confirmation Dialog
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog'

// Search box
import SearchBox from 'Components/SearchBox'

// No record
import NoRecord from 'Components/NoRecord'

// pagination
import Pagination from 'Components/Pagination'

// Data table length
import DataTableLength from 'Components/DataTableLength'

// Create button
import CreateButton from 'Components/CreateButton'

import ImportButton from 'Components/ImportButton'

// Bulk Delete button
import BulkDeleteButton from 'Components/BulkDeleteButton'

// Tree select box
import Treeselect from '@riophae/vue-treeselect'

// Multiselect
import Multiselect from 'vue-multiselect'

const GlobalComponents = {
  install(Vue) {
    Vue.component('vuePerfectScrollbar', VuePerfectScrollbar)
    Vue.component('pageTitleBar', PageTitleBar)
    Vue.component('appCard', AppCard)
    Vue.component('appSectionLoader', AppSectionLoader)
    Vue.component('countUp', CountUp)
    Vue.component('deleteConfirmationDialog', DeleteConfirmationDialog)
    Vue.component('searchBox', SearchBox)
    Vue.component('noRecord', NoRecord)
    Vue.component('pagination', Pagination)
    Vue.component('dataTableLength', DataTableLength)
    Vue.component('createButton', CreateButton)
    Vue.component('importButton', ImportButton)
    Vue.component('bulkDeleteButton', BulkDeleteButton)
    Vue.component('treeselect', Treeselect)
    Vue.component('multiselect', Multiselect)
  }
}

export default GlobalComponents
