const plainConverter = models => {
  return models.map(model => model.get({ plain: true }));
};

module.exports = {
  plainConverter,
};
