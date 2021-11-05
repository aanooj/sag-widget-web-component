((target, w, $) => {
  console.log("initialized");
  class FuelSavingCalculator {
    constructor(target) {
      this.options = {
        target: target,
        className: "fuel-saving-calculator",
        petrolPrice: 104.46,
        CNGPrice: 62.99,
        averageKMPerDay: 40,
        averageMileage: 14,
        suffix: {
          rs: "&#8377;",
          perliter: "/liter",
          perKg: "/Kg"
        }
      };

      this.defaultValues = {
        mileageIncrease: 1.6,
        petrolPrice: 104.46,
        CNGPrice: 62.99,
        mileage: 14,
        kmPerDay: 40
      };

      // widge container
      this.container = $(".fuel-saving-calculator");
      this.shareThisIcon = $(".button-list");
      this.$messageContainer = $(".fuel-save-message");

      this.inputs = $("input", this.container);

      // all input
      this.input = {
        $petrolPriceInput: $("#petrol-price", this.container),
        $cngPriceInput: $("#cng-price", this.container),
        $mileageInput: $("#mileage", this.container),
        $kmPerDayInput: $("#km-per-day", this.container)
      };

      this.resultBlocks = {
        $cngPricePerKm: $(".cng-price-per-km", this.container),
        $petrolPricePerKm: $(".petrol-price-per-km", this.container),
        $perDaySaving: $(".per-day-saving", this.container),
        $perMonthSaving: $(".per-month-saving", this.container)
      };

      this.initialize();
    }

    initialize() {
      if (this.options.target !== null) {
        $(this.options.target)
          .append(this.container.detach())
          .addClass(this.options.className);
      }
      this.loadForm();
      this.bindEvents();
      this.calculateSaving();
    }

    loadForm() {
      this.input.$petrolPriceInput.val(this.defaultValues.petrolPrice);
      this.input.$cngPriceInput.val(this.defaultValues.CNGPrice);
      this.input.$mileageInput.val(this.defaultValues.mileage);
      this.input.$kmPerDayInput.val(this.defaultValues.kmPerDay);
    }

    bindEvents() {
      this.inputs.on("keyup", (e) => {
        this.calculateSaving();
      });
    }

    calculateSaving() {
      this.petrolPrice =
        this.input.$petrolPriceInput.val() || this.defaultValues.petrolPrice;
      this.cngPrice =
        this.input.$cngPriceInput.val() || this.defaultValues.CNGPrice;
      this.mileage =
        this.input.$mileageInput.val() || this.defaultValues.mileage;
      this.kmPerDay =
        this.input.$kmPerDayInput.val() || this.defaultValues.kmPerDay;

      this.input.$petrolPriceInput.next().html(this.petrolPrice);
      this.input.$cngPriceInput.next().html(this.cngPrice);
      this.input.$mileageInput.next().html(this.mileage);
      this.input.$kmPerDayInput.next().html(this.kmPerDay);

      this.costCNGPerKm = (
        this.cngPrice /
        (this.mileage * this.defaultValues.mileageIncrease)
      ).toFixed(2);
      this.costPetrolPerKm = (this.petrolPrice / this.mileage).toFixed(2);
      this.dailySaving = Math.ceil(
        this.kmPerDay * (this.costPetrolPerKm - this.costCNGPerKm)
      );
      this.monthlySaving = Math.ceil(this.dailySaving * 30);

      this.showResult();
    }

    showResult() {
      this.resultBlocks.$cngPricePerKm.html(
        this.options.suffix.rs + this.costCNGPerKm
      );
      this.resultBlocks.$petrolPricePerKm.html(
        this.options.suffix.rs + this.costPetrolPerKm
      );
      this.resultBlocks.$perDaySaving.html(
        this.options.suffix.rs + this.dailySaving
      );
      this.resultBlocks.$perMonthSaving.html(
        this.options.suffix.rs + this.monthlySaving
      );

      this.shareThisIcon
        .find("span")
        .attr(
          "data-title",
          `${this.$messageContainer
            .html()
            .replace(
              /<[^>]*>/gi,
              ""
            )} How much did you save today?  #surabhiautogas`
        )
        .attr(
          "data-description",
          `${this.$messageContainer
            .html()
            .replace(
              /<[^>]*>/gi,
              ""
            )} How much did you save today?  #surabhiautogas`
        );
    }
  }

  w.savingCalculator =
    window.savingCalculator ||
    setTimeout(() => {
      new FuelSavingCalculator(target);
    }, 2000);
})(null, window, $);
