define(function() {

	function edit(categorySelect, selectElement, behaviour) {
		var global = $('option:selected', selectElement).attr("global");
		if (global == "true") {
			alert("Sorry, but you cannot edit global variables!");
			return;
		}
		$.getJSON("/variables/variable/" + selectElement.val(), function(variable) {
			if (variable.global) {
				// sanity check
				alert("Error, try to edit global variable!");
				return;
			}
			showAggregatedVariableSettings(variable, categorySelect, selectElement, behaviour);
		});
	}

	function add(categorySelect, variableSelect, behaviour) {
		var selectedCategory = categorySelect.val();
		showAggregatedVariableSettings({
			selectedCategory : selectedCategory
		}, categorySelect, variableSelect, behaviour);
	}

	function refreshUserVariableCategories(categoryId) {
		$.getJSON("/categories", function(data) {
			var userCategories = $("#edit_variable_category");
			userCategories.find("option").remove();
			$.each(data, function(key, val) {
				userCategories.append("<option value='" + val.id + "'>" + val.name + "</value>");
			});
			userCategories.val(categoryId);
		});
	}

	function showSimpleAddCategoryDialog() {
		App.loadMustacheTemplate("variablesMgmtTemplates.html", "addCategory", function(template) {
			var html = template.render();
			App.makeModal(html);

			$("#add_category_save").click(function() {
				var name = $.trim($("#add_category_name").val());
				var error = $("#add_category_name_error");
				if (name) {
					error.hide();
				} else {
					error.html("Category name is required");
					error.show();
					return false;
				}

				var newCategory = {
					name : name
				};

				$.ajax({
					type : "POST",
					contentType : "application/json; charset=utf-8",
					url : "/categories/category",
					data : JSON.stringify(newCategory),
					dataType : "json"
				}).always(function(data) {
					var statusModel = data.status_model;
					if ("OK" != statusModel.result) {
						error.html(statusModel.message);
						error.show();
						return;
					}
					$('#AddCategoryDialog').modal('hide');
					refreshUserVariableCategories(data.id);
				});
			});
		});
	}

	function showAggregatedVariableSettings(variableSettings, categorySelect, variableSelect, behaviour) {
		if (variableSettings == undefined) {
			variableSettings = {};
		}
		var units = undefined;
		var timeUnits = undefined;
		var nonEmptyMeasures = undefined;
		var categories = undefined;

		$.when($.getJSON("/variables/units", function(data) {
			units = data;
		}), $.getJSON("/variables/time_shift_units", function(data) {
			timeUnits = data;
		}), $.getJSON("/variables/non_empty_measures", function(data) {
			nonEmptyMeasures = data;
		}), $.getJSON("/categories", function(data) {
			categories = data;
		})).done(function() {
			$('#AddVariableDialog').modal('hide');
			App.loadMustacheTemplate("variablesMgmtTemplates.html", "aggregatedVariableSettings", function(template) {
				var html = template.render({
					variableSettings : variableSettings,
					categories : categories,
					units : units,
					timeShiftUnits : timeUnits,
					nonEmptyMeasures : nonEmptyMeasures
				});
				App.makeModal(html);

				bindEditAggregatedVariableControls(variableSettings, categorySelect, variableSelect, behaviour);
				$("#sortable_remaining_variables, #sortable").sortable({connectWith: ".connectedSortable"}).disableSelection();
				$("#sortable_remaining_variables").sortable({
				    receive: function(event, ui){
					var ID = ui.item.find("div").attr('var_id');
					ui.item.parent().find("li").removeClass("prioritized").addClass("remaining");
					ui.item.find("div").removeClass("edit_aggregated_variable_prioritized_variable").addClass("edit_aggregated_variable_remaining_variable");
					ui.item.find("span").remove();
					ui.item.find(".up_variable").remove();
					ui.item.find(".down_variable").remove();
					ui.item.find(".remove_variable").remove();
					ui.item.append('<a class="remove_variable remaining" for_id="' + ID + '"></a>');
				    }
				});
				$("#sortable").sortable({
				    receive: function(event, ui){
					var ID = ui.item.find("div").attr('var_id');
					ui.item.parent().find("li").removeClass("remaining").addClass("prioritized");
					ui.item.find("div").removeClass("edit_aggregated_variable_remaining_variable").addClass("edit_aggregated_variable_prioritized_variable");
					ui.item.prepend('<span class="priority"></span>');
					ui.item.find(".remove_variable").remove();
					ui.item.append('<a class="up_variable" for_id="' + ID + '"></a>');
					ui.item.append('<a class="down_variable" for_id="' + ID + '"></a>');
					ui.item.append('<a class="remove_variable prioritized" for_id="' + ID + '"></a>');
				    }
				
				});
				$("#sortable li:first").find('.up_variable').addClass("up_variable_hide");
				$("#sortable li:last").prev().find('.down_variable').removeClass("down_variable_hide");
				$("#sortable li:last").find('.down_variable').addClass("down_variable_hide");

			});
		});
	}

	function bindEditAggregatedVariableControls(variableSettings, categorySelect, variableSelect, behaviour) {
		$("#edit_aggregated_variable_add_category").click(function() {
			showSimpleAddCategoryDialog();
		});

		$("#edit_aggregated_variable_unit").change();

		$("#edit_aggregated_variable_non_empty").change(function() {
			var selectedUnit = $(this).children("option").filter(":selected").text();
			if (selectedUnit == "") {
				$("#edit_aggregated_variable_non_empty_options").hide();
				$("input[name='edit_aggregated_variable_data_filling'][value='0']").attr("checked", "checked");
				return;
			}
			$("#edit_aggregated_variable_non_empty_options").show();
			$(".edit_aggregated_variable_non_empty").html(selectedUnit);
			$(".edit_aggregated_variable_non_empty.multiple").html(selectedUnit + "s");
		});

		$("#edit_aggregated_variable_non_empty").change();

		$("#edit_aggregated_variable_save").click(function() {
			saveAggregatedVariable(variableSettings.id, categorySelect, variableSelect, behaviour);
		});

		var selectedCategory = variableSettings.variableCategoryId ? variableSettings.variableCategoryId
				: variableSettings.selectedCategory;

		$("#edit_aggregated_variable_category").val(selectedCategory);
		
		function updateUnitLabels(unitSelect){
			var selectedUnit = unitSelect.children("option").filter(":selected").text();
			$(".edit_aggregated_variable_unit").html(selectedUnit);
		}
		
		$("#edit_aggregated_variable_unit").change(function(){
			var unitSelect=$(this);
			var siUnit=$("#edit_aggregated_variable_unit option:checked").attr("si_unit");
			if($(".edit_aggregated_variable_prioritized_variable[si_unit!='"+siUnit+"']").length==0 && 
					$(".edit_aggregated_variable_remaining_variable[si_unit!='"+siUnit+"']").length==0){
				unitSelect.attr('pre', unitSelect.val());
				updateUnitLabels(unitSelect);
				return true;
			}
			App.loadMustacheTemplate("variablesMgmtTemplates.html", "clearVariableContent", function(template) {
				var html = template.render();
				App.makeModal(html);
				$("#confirm_clear_variable").click(function(){
					$("#edit_aggregated_variable_prioritized_variables .edit_aggregated_variable_wrapper").remove();
					$("#edit_aggregated_variable_remaining_variables .edit_aggregated_variable_wrapper").remove();
					$('#clearVariableContentDialog').modal('hide');
					unitSelect.attr('pre', unitSelect.val());
					updateUnitLabels(unitSelect);
				});
				$("#cancel_clear_variable").click(function(){
					unitSelect.val(unitSelect.attr('pre'));
					updateUnitLabels(unitSelect);
					$('#clearVariableContentDialog').modal('hide');
				});
			});
		});
		
		if(variableSettings.unitDto){
			$("#edit_aggregated_variable_unit").val(variableSettings.unitDto.id);
			$("#edit_aggregated_variable_unit").change();
		}

		
		$("#edit_aggregated_variable_time_shift_unit").val(variableSettings.timeShiftUnit);
		$("#edit_aggregated_variable_time_shift_unit").change();
		$("#edit_aggregated_variable_non_empty").val(variableSettings.nonEmptyPeriod ? variableSettings.nonEmptyPeriod.value : "");
		$("#edit_aggregated_variable_non_empty").change();
		$("#edit_aggregated_variable_remaining_type").val(variableSettings.remainingType);
		$("#edit_aggregated_variable_remaining_type").change();

		if(variableSettings.filling){
			$("[name='edit_aggregated_variable_data_filling'][value='" + variableSettings.filling.type + "']").attr(
					"checked", "checked");
			$(".edit_aggregated_variable_data_filling_value[for='" + variableSettings.filling.type + "']").val(
					variableSettings.filling.value);
		}

		$("#edit_aggregated_variable_add_remaining").click(function() {
			showAddVariablesDialog(behaviour, addRemainingVariable);
		});

		$("#edit_aggregated_variable_add_prioritized").click(function() {
			showAddVariablesDialog(behaviour, addPrioritizedVariable);
		});

		$(".remove_variable.remaining").die('click');
		$(".remove_variable.remaining").live("click", function() {
			var variableId = $(this).attr("for_id");
			$(".edit_aggregated_variable_wrapper.remaining[for_id='" + variableId + "']").remove();
			removeUnitRestrictionsIfNeeded();
		});

		$(".remove_variable.prioritized").die('click');
		$(".remove_variable.prioritized").live("click", function() {
			var variableId = $(this).attr("for_id");
			var wrapper = $(".edit_aggregated_variable_wrapper.prioritized[for_id='" + variableId + "']");
			wrapper.remove();
			sortPrioritizedVariables();
			removeUnitRestrictionsIfNeeded();
		});

		$(".up_variable").die('click');
		$(".up_variable").live("click", function() {
			var variableId = $(this).attr("for_id");
			var wrapper = $(".edit_aggregated_variable_wrapper.prioritized[for_id='" + variableId + "']");
			var previousWrapper = wrapper.prev();
			previousWrapper.attr("priority");
			if (previousWrapper.length==0) {
				return;
			}
			
			previousWrapper.before(wrapper);
			sortPrioritizedVariables();
		});

		$(".down_variable").die('click');
		$(".down_variable").live("click", function() {
			var variableId = $(this).attr("for_id");
			var wrapper = $(".edit_aggregated_variable_wrapper.prioritized[for_id='" + variableId
					+ "']");
			var nextWrapper = wrapper.next();
			if (nextWrapper.length==0) {
				return;
			}
			
			nextWrapper.after(wrapper);
			sortPrioritizedVariables();
		});
		
		$( "#sortable" ).on( "sortupdate", function( event, ui ) {
			sortPrioritizedVariables();
		} );


		$("#edit_aggregated_variable_delete").click(function() {
			var name = $.trim($("#edit_aggregated_variable_name").val());
			confirmVariableDelete(variableSettings.id, name, categorySelect, variableSelect, selectedCategory);
		});

	}
	
	function sortPrioritizedVariables(){
		$("#sortable li").each(function(i, el){
			$(el).attr("priority", i);
			$(el).find(".priority").html(i);
			$(el).find('.up_variable').removeClass("up_variable_hide");
			$(el).find('.down_variable').removeClass("down_variable_hide");
		});
		$("#sortable li:first").find('.up_variable').addClass("up_variable_hide");
		$("#sortable li:last").find('.down_variable').addClass("down_variable_hide");
	}
	
	function removeUnitRestrictionsIfNeeded(){
		if($(".edit_aggregated_variable_wrapper").length==0){
			$("#edit_aggregated_variable_unit").val("");
			$("#edit_aggregated_variable_unit").change();
		}
	}

	function confirmVariableDelete(varId, name, categorySelect, variableSelect, category) {
		App.loadMustacheTemplate("variablesMgmtTemplates.html", "deleteVariableConfirm", function(template) {
			var html = template.render({
				name : name
			});
			App.makeModal(html);
			$("#confirm_remove_variable_btn").click(function() {
				$.ajax({
					type : "DELETE",
					url : "variables/variable/" + varId
				}).done(function(data) {
					$('#deleteVariableConfirmDialog').modal('hide');
					$('#AggregatedVariableSettingsDialog').modal('hide');
					refreshCategoriesSelect(categorySelect, variableSelect, category);
				});
			});
		});
	}

	function showAddVariablesDialog(behaviour, addVariableCallback) {
		var variables = undefined;
		var siUnit = $("#edit_aggregated_variable_unit option:checked").attr("si_unit");
		var url;
		if (siUnit) {
			url = '/variables/single/by_si_unit?behaviour=' + behaviour + "&si_unit=" + siUnit;
		} else {
			url = '/variables//single/all?behaviour=' + behaviour;
		}
		$.when($.getJSON(url, function(json) {
			variables = json;
		})).done(function() {
			App.loadMustacheTemplate("variablesMgmtTemplates.html", "addVariables", function(template) {
				removeUsedVariables(variables);
				var html = template.render({
					variables : variables
				});
				App.makeModal(html);

				bindAddVariableControls(addVariableCallback);
			});
		});
	}

	function removeUsedVariables(variables) {
		for ( var i = variables.length - 1; i >= 0; i--) {
			$("#edit_aggregated_variable_remaining_variables .edit_aggregated_variable_remaining_variable").each(
				function(idx, variableElement) {
					var item = variables[i];
					if (!item) {
						return;
					}
					var userVarId = $(variableElement).attr("var_id");
					if (parseInt(userVarId) == item.id) {
						variables.splice(i, 1);
						return;
					}
				});
			$("#edit_aggregated_variable_prioritized_variables .edit_aggregated_variable_prioritized_variable").each(
					function(idx, variableElement) {
						var item = variables[i];
						if (!item) {
							return;
						}
						var userVarId = $(variableElement).attr("var_id");
						if (parseInt(userVarId) == item.id) {
							variables.splice(i, 1);
							return;
						}
					});
		}
	}

	function bindAddVariableControls(addVariableCallback) {
		$(".add_variables_variable").click(function() {
			if ($(this).hasClass("selected")) {
				$(this).removeClass("selected");
			} else {
				$(".add_variables_variable").removeClass("selected");
				$(this).addClass("selected");
			}
		});

		$("#add_variables_variable_add").click(function() {
			var selectedVariableElementClone = $(".add_variables_variable.selected").clone();
			selectedVariableElementClone.removeClass("add_variables_variable");
			selectedVariableElementClone.removeClass("selected");
			addVariableCallback(selectedVariableElementClone);
			var unitSelect=$("#edit_aggregated_variable_unit");
			if(unitSelect.val()==""){
				unitSelect.val(selectedVariableElementClone.attr("unit_id"));
				unitSelect.change();
			}
			$("#sortable_remaining_variables, #sortable").sortable({connectWith: ".connectedSortable"}).disableSelection();
			$("#sortable li:first").find('.up_variable').addClass("up_variable_hide");
			$("#sortable li:last").prev().find('.down_variable').removeClass("down_variable_hide");
			$("#sortable li:last").find('.down_variable').addClass("down_variable_hide");
			$('#AddVariablesDialog').modal('hide');
		});
	}

	function addRemainingVariable(selectedVariableElementClone) {
		selectedVariableElementClone.addClass("edit_aggregated_variable_remaining_variable");
		var variableId = selectedVariableElementClone.attr("var_id");
		var selectedVariableHtml = selectedVariableElementClone.wrap('<div>').parent().html();
		$("#sortable_remaining_variables").append(
				"<li for_id='" + variableId + "' class='edit_aggregated_variable_wrapper remaining'>"
						+ selectedVariableHtml + "<a class='remove_variable remaining' for_id='" + variableId
						+ "'/></li>");
	}

	function addPrioritizedVariable(selectedVariableElementClone) {
		selectedVariableElementClone.addClass("edit_aggregated_variable_prioritized_variable");
		var variableId = selectedVariableElementClone.attr("var_id");
		var priority = $("#edit_aggregated_variable_prioritized_variables .edit_aggregated_variable_prioritized_variable").length;
		var selectedVariableHtml = selectedVariableElementClone.wrap('<div>').parent().html();
		$("#sortable").append(
				"<li for_id='" + variableId + "' class='edit_aggregated_variable_wrapper prioritized' priority='"+priority+"'>"
						+ "<span class='priority'>" + priority + "</span>" + selectedVariableHtml
						+ "<a class='up_variable' for_id='" + variableId + "'/>" + "<a class='down_variable' for_id='"
						+ variableId + "'/>" + "<a class='remove_variable prioritized' for_id='" + variableId
						+ "'/></li>");
	}

	function saveAggregatedVariable(id, categorySelect, variableSelect, behaviour) {
		var name = $.trim($("#edit_aggregated_variable_name").val());
		var categoryId = $("#edit_aggregated_variable_category").val();
		var unitId = $("#edit_aggregated_variable_unit").val();
		var maxValue = $("#edit_aggregated_variable_max_value").val();
		var minValue = $("#edit_aggregated_variable_min_value").val();
		var timeShift = $("#edit_aggregated_variable_time_shift").val();
		var timeShiftUnit = $("#edit_aggregated_variable_time_shift_unit").val();
		var nonEmptyPeriod = $("#edit_aggregated_variable_non_empty").val();
		var fillingType = $("[name='edit_aggregated_variable_data_filling']:checked").val();
		var fillingInput = $(".edit_aggregated_variable_data_filling_value[for='" + fillingType + "']");
		var fillingValue = null;
		if (fillingInput.length > 0) {
			fillingValue = fillingInput.val();
		}
		var remainingType = $("#edit_aggregated_variable_remaining_type").val();

		var error = $("#edit_aggregated_variable_error");
		var errorMessage = "";
		if (!name) {
			errorMessage += "Variable name is required";
		}
		if (errorMessage == "") {
			error.hide();
		} else {
			error.html(errorMessage);
			error.show();
			return;
		}

		var remainingVariables = [];

		$("#edit_aggregated_variable_remaining_variables .edit_aggregated_variable_remaining_variable").each(
				function(idx, element) {
					remainingVariables.push({
						id : $(element).attr("var_id")
					});
				});

		var prioritizedVariables = [];

		$("#edit_aggregated_variable_prioritized_variables .edit_aggregated_variable_wrapper.prioritized").each(
				function(idx, element) {
					prioritizedVariables.push({
						id : $(element).attr("for_id"),
						priority : $(element).attr("priority")
					});
				});
		
		var unit={id:unitId};

		var variable = {
			"id" : id,
			"name" : name,
			"keepZeroes" : true,
			"categoryId" : categoryId,
			"unitDto" : unit,
			"maxValue" : maxValue,
			"minValue" : minValue,
			"timeShift" : timeShift,
			"timeShiftUnit" : timeShiftUnit,
			"filling" : {
				type : fillingType,
				value : fillingValue
			},
			"type" : "AGGREGATED",
			"remainingVariables" : remainingVariables,
			"prioritizedVariables" : prioritizedVariables,
			"remainingType" : remainingType
		};
		
		if(nonEmptyPeriod){
			variable.nonEmptyPeriod={
				"value" : nonEmptyPeriod
			};
		}

		$.ajax({
			type : "POST",
			contentType : "application/json; charset=utf-8",
			url : "/variables/variable",
			data : JSON.stringify(variable),
			dataType : "json"
		}).always(function(data) {
			var statusModel = data.status_model;
			if ("OK" != statusModel.result) {
				error.html(statusModel.message);
				error.show();
				return;
			}
			$('#AggregatedVariableSettingsDialog').modal('hide');
			refreshCategoriesSelect(categorySelect, variableSelect, categoryId);
		});
	}

	function showAddEditCategoryDialog(category, categorySelect, varsSelect, behaviour) {
		var variables = undefined;
		$.when($.getJSON('/variables/aggregated/all?behaviour=' + behaviour, function(json) {
			variables = json;
		})).done(function() {
			if (category) {
				for ( var i = variables.length - 1; i >= 0; i--) {
					category.variables.forEach(function(categoryItem) {
						item = variables[i];
						if (!item) {
							return;
						}
						if (categoryItem.id == item.id) {
							variables.splice(i, 1);
							return;
						}
					});
				}
			}
			App.loadMustacheTemplate("variablesMgmtTemplates.html", "addEditCategory", function(template) {
				var html = template.render({
					variableCategoryName : category,
					variables : variables,
					global : category && category.global
				});
				App.makeModal(html);

				bindCategoryAddRemoveControls();

				$("#add_edit_category_save").click(function() {
					var name = $.trim($("#add_edit_category_name").val());
					var error = $("#add_edit_category_error");
					if (name) {
						error.hide();
					} else {
						error.html("Category name is required");
						error.show();
						return false;
					}

					var newCategory = {
						"name" : name,
						"variables" : []
					};
					if (category && category.id) {
						newCategory.id = category.id;
					}

					$("#add_edit_category_category_variables .add_edit_category_variable").each(function(idx, element) {
						var newElement = {
							"id" : $(element).attr('var_id'),
							"dataOwner" : $(element).attr('data_owner')
						};
						newCategory.variables.push(newElement);
					});

					$.ajax({
						type : "POST",
						contentType : "application/json; charset=utf-8",
						url : "/categories/category",
						data : JSON.stringify(newCategory),
						dataType : "json"
					}).always(function(data) {
						var statusModel = data.status_model;
						if ("OK" != statusModel.result) {
							error.html(statusModel.message);
							error.show();
							return;
						}
						$('#AddEditCategoryDialog').modal('hide');
						refreshCategoriesSelect(categorySelect, varsSelect, data.id);
					});
				});
			});
		});
	}

	function bindCategoryAddRemoveControls() {
		$(".add_edit_category_left_arrow").die("click");
		$(".add_edit_category_left_arrow").live("click",
			function() {
				var forVariableId = $(this).attr('for');
				var variableElement = $("#" + forVariableId);
				variableElement.parent().remove();
				var newWrapperHtml = "<div id='add_edit_category_variable_wrapper' for='" + forVariableId + "'>"
						+ variableElement.clone().wrap('<div>').parent().html()
						+ "<div class='add_edit_category_right_arrow' for='" + forVariableId + "'></div></div>";
				$("#add_edit_category_category_variables").append(newWrapperHtml);
			});

		$(".add_edit_category_right_arrow").die("click");
		$(".add_edit_category_right_arrow").live("click",
			function() {
				var forVariableId = $(this).attr('for');
				var variableElement = $("#" + forVariableId);
				variableElement.parent().remove();
				var newWrapperHtml = "<div id='add_edit_category_variable_wrapper' for='" + forVariableId + "'>"
						+ "<div class='add_edit_category_left_arrow' for='" + forVariableId + "'></div>"
						+ variableElement.clone().wrap('<div>').parent().html() + "</div>";
				$("#add_edit_category_other_variables").append(newWrapperHtml);
			});
	}

	function editCategory(categorySelect, varsSelect, behaviour) {
		$.getJSON("/categories/category/" + categorySelect.val(), function(category) {
			showAddEditCategoryDialog(category, categorySelect, varsSelect, behaviour);
		});
	}

	function addCategory(categorySelect, varsSelect, behaviour) {
		showAddEditCategoryDialog(undefined, categorySelect, varsSelect, behaviour);
	}

	function addVariableToCategory(element) {
		alert(element.attr("var_id"));
	}

	var ManageVariables = {};
	ManageVariables.add = add;
	ManageVariables.edit = edit;
	ManageVariables.addCategory = addCategory;
	ManageVariables.editCategory = editCategory;
	return ManageVariables;
});
