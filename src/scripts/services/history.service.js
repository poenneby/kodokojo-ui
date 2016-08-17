const historyService = {}

// TODO does nothing yet, could handle analytics in the future
historyService.handleHistoryChange = (location) => {
  console.log('history service detect change: ', location) // eslint-disable-line no-console
}

// public API
export const handleHistoryChange = historyService.handleHistoryChange

export default historyService
