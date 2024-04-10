let table = new DataTable("#InventoryTable", {
  dom: "ftpr",
  responsive: true,
  ajax: { url: "src/assets/data/data.json", dataSrc: "" },
  columns: [
    {
      title: "Producto",
      data: "Name",
    },
    {
      title: "Stock (Kg)",
      data: "Stock",
    },
    {
      title: "Precio al Detal ($)",
      data: "RetailPrice",
    },
    {
      title: "Precio al Mayor ($)",
      data: "WholesalePrice",
    },
    {
      title: "Acciones",
      data: null,
      defaultContent:
        '<div class="d-flex gap-1 justify-content-center"><button class="btn btn-sm btn-warning edit" data-bs-toggle="modal" data-bs-target="#articuloModal"><i class="ti ti-edit"></i></button> <button class="btn btn-sm btn-danger delete" data-bs-toggle="modal" data-bs-target="#deleteModal"><i class="ti ti-trash"></i></button></div>',
    },
  ],
  language: {
    url: "src/assets/i18n/es-ES.json",
  },
});

function changeModalTitle(isUpdate) {
  let title = $("#articuloModalLabel");
  if (isUpdate) {
    title.text("Editar Articulo");
  } else {
    title.text("Crear Articulo");
  }
}

function resetModalData() {
  $("#IdArticulo").val("0");
  $("#Name").val("");
  $("#Description").val("");
  $("#RetailPrice").val("");
  $("#WholesalePrice").val("");
  $("#Stock").val("");
}

function getDataForEdit(tbody, table) {
  $(tbody).on("click", "button.edit", function () {
    let data = table.row($(this).parents("tr")).data();
    console.log(data.WholesalePrice);

    $("#ArticuloForm #IdArticulo").val(data.Id);
    $("#Name").val(data.Name);
    $("#Description").val(data.Description);
    $("#RetailPrice").val(data.RetailPrice);
    $("#WholesalePrice").val(data.WholesalePrice);
    $("#Stock").val(data.Stock);

    changeModalTitle(true);
  });
}

function getDataForDelete(tbody, table) {
  $(tbody).on("click", "button.delete", function () {
    let data = table.row($(this).parents("tr")).data();
    console.log(data.Id);
    $("#DeleteForm #IdArticulo").val(data.Id);
  });
}

getDataForEdit("#InventoryTable tbody", table);
getDataForDelete("#InventoryTable tbody", table);
$("#AgregarArticulo").click(() => {
  changeModalTitle(false);
  resetModalData();
});
