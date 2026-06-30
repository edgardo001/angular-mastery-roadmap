import { Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

/**
 * Componente de gráfico de barras usando D3.js
 *
 * D3.js es la librería más popular para visualizaciones SVG en JavaScript.
 * Permite control total sobre cada elemento del gráfico.
 *
 * Analogía: Si Chart.js es como usar PowerPoint (predefinido),
 * D3.js es como dibujar en canvas (control total).
 */
@Component({
  selector: 'app-d3-bar-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-container">
      <h3>{{ title }}</h3>
      <div #chart class="chart-area"></div>
    </div>
  `,
  styles: [`
    .chart-container { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .chart-area { width: 100%; min-height: 300px; }
    :host ::ng-deep .bar { fill: #1a73e8; transition: fill 0.3s; }
    :host ::ng-deep .bar:hover { fill: #1557b0; }
    :host ::ng-deep .axis text { fill: #333; font-size: 12px; }
    :host ::ng-deep .axis line, :host ::ng-deep .axis path { stroke: #ccc; }
    :host ::ng-deep .grid line { stroke: #eee; }
    :host ::ng-deep .grid path { display: none; }
    :host ::ng-deep .tooltip {
      position: absolute; background: rgba(0,0,0,0.8); color: white;
      padding: 8px 12px; border-radius: 4px; font-size: 12px; pointer-events: none;
    }
  `],
})
export class D3BarChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;
  @Input() data: { label: string; value: number }[] = [];
  @Input() title = 'Gráfico de Barras D3';

  private tooltip: any;
  private resizeObserver: ResizeObserver;

  constructor() {
    this.resizeObserver = new ResizeObserver(() => {
      if (this.data.length > 0) this.createChart();
    });
  }

  ngAfterViewInit() {
    this.resizeObserver.observe(this.chartContainer.nativeElement);
    if (this.data.length > 0) this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && this.chartContainer) {
      this.createChart();
    }
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect();
  }

  private createChart() {
    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 90 };
    const width = element.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    // Crear SVG
    const svg = d3.select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Escalas: transforman datos en posiciones/pixeles
    const x = d3.scaleBand()
      .domain(this.data.map(d => d.label))
      .range([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.data, d => d.value) || 0])
      .nice()
      .range([height, 0]);

    // Ejes
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y));

    // Grid lines: guías horizontales para leer valores
    svg.append('g')
      .attr('class', 'grid')
      .call(d3.axisLeft(y).tickSize(-width).tickFormat(''));

    // Tooltip: cuadro emergente al pasar el mouse
    this.tooltip = d3.select(element)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    // Barras con animación secuencial
    svg.selectAll('.bar')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any) => x(d.label)!)
      .attr('width', x.bandwidth())
      .attr('y', height)
      .attr('height', 0)
      .on('mouseover', (event: MouseEvent, d: any) => {
        this.tooltip.transition().duration(200).style('opacity', 1);
        this.tooltip.html(`${d.label}: ${d.value}`)
          .style('left', `${event.offsetX + 10}px`)
          .style('top', `${event.offsetY - 10}px`);
      })
      .on('mouseout', () => {
        this.tooltip.transition().duration(500).style('opacity', 0);
      })
      .transition()
      .duration(800)
      .delay((d: any, i: number) => i * 100)
      .attr('y', (d: any) => y(d.value))
      .attr('height', (d: any) => height - y(d.value));

    // Valor numérico encima de cada barra
    svg.selectAll('.label')
      .data(this.data)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', (d: any) => x(d.label)! + x.bandwidth() / 2)
      .attr('y', (d: any) => y(d.value) - 5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#333')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .text((d: any) => d.value);
  }
}
