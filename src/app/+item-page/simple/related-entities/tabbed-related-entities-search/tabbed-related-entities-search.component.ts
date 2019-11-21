import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../../../core/shared/item.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ds-tabbed-related-entities-search',
  templateUrl: './tabbed-related-entities-search.component.html'
})
/**
 * A component to show related items as search results, split into tabs by relationship-type
 * Related items can be facetted, or queried using an
 * optional search box.
 */
export class TabbedRelatedEntitiesSearchComponent implements OnInit {
  /**
   * The types of relationships to fetch items for
   * e.g. 'isAuthorOfPublication'
   */
  @Input() relationTypes: Array<{
    label: string,
    filter: string,
    configuration?: string
  }>;

  /**
   * The item to render relationships for
   */
  @Input() item: Item;

  /**
   * Whether or not the search bar and title should be displayed (defaults to true)
   * @type {boolean}
   */
  @Input() searchEnabled = true;

  /**
   * The ratio of the sidebar's width compared to the search results (1-12) (defaults to 4)
   * @type {number}
   */
  @Input() sideBarWidth = 4;

  /**
   * The active tab
   */
  activeTab: string;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  /**
   * If the url contains a "tab" query parameter, set this tab to be the active tab
   */
  ngOnInit(): void {
    this.activeTab = this.route.snapshot.queryParams.tab;
  }

  /**
   * Add a "tab" query parameter to the URL when changing tabs
   * @param event
   */
  onTabChange(event) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        tab: event.nextId
      },
      queryParamsHandling: 'merge'
    });
  }

}
