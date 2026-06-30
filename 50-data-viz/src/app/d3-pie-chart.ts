import { Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

/**
 * Componente de gráfico circular (pie/donut) usando D3.js
 *
 * Muestra proporciones de un total. Cada porción representa un porcentaje.
 *
 * Analogía: Es como una pizza donde cada toppings representa una categoría.
 * El tamaño de cada porción indica su proporción del total.
 */
@Component({
  selector: 'app-d3-pie-chart',
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
    .chart-area { width: 100%; min-height: 300px; display: flex; justify-content: center; }
    :host ::ng-deep .slice { stroke: white; stroke-width: 2; cursor: pointer; transition: transform 0.2s; }
    :host ::ng-deep .slice:hover { transform: scale(1.05); }
    :host ::ng-deep .legend-item { cursor: pointer; }
    :host ::ng-deep .legend-item text { fill: #333; font-size: 13px; }
  `],
})
export class D3PieChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef;
  @Input() data: { label: string; value: number; color: string }[] = [];
  @Input() title = 'Gráfico Circular D3';

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
    if (changes['data'] && this.chartContainer) this.createChart();
  }

  ngOnDestroy() { this.resizeObserver.disconnect(); }

  private createChart() {
    const element = this.chartContainer.nativeElement;
    d3.select(element).selectAll('*').remove();

    const width = 300, height = 300, radius = Math.min(width, height) / 2;

    const svg = d3.select(element)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Escala de colores: asigna un color por categoría
    const color = d3.scaleOrdinal<string>()
      .domain(this.data.map(d => d.label))
      .range(this.data.map(d => d.color));

    // Pie layout: calcula ángulos para cada porción
    const pie = d3.pie<any>().value((d) => d.value).sort(null);
    // Arc: convierte ángulos en formas SVG
    const arc = d3.arc<any>().innerRadius(0).outerRadius(radius);
    const arcHover = d3.arc<any>().innerRadius(0).outerRadius(radius + 10);

    const slices = svg.selectAll('.slice')
      .data(pie(this.data))
      .enter()
      .append('g')
      .attr('class', 'slice');

    // Porciones con animación de apertura
    slices.append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.label))
      .style('opacity', 0)
      .on('mouseover', function(event: MouseEvent, d: any) {
        d3.select(this).transition().duration(200).attr('d', arcHover);
      })
      .on('mouseout', function(event: MouseEvent, d: any) {
        d3.select(this).transition().duration(200).attr('d', arc);
      })
      .transition()
      .duration(800)
      .delay((d, i) => i * 150)
      .style('opacity', 1)
      .attrTween('d', function(d: any) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return (t: number) => arc(interpolate(t));
      });

    // Porcentajes dentro de cada porción
    const total = this.data.reduce((sum, d) => sum + d.value, 0);
    svg.selectAll('.percent')
      .data(pie(this.data))
      .enter()
      .append('text')
      .attr('class', 'percent')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .text((d) => {
        const pct = ((d.data.value / total) * 100).toFixed(0);
        return pct + '%';
      });

    // Leyenda lateral
    const legend = svg.selectAll('.legend')
      .data(this.data)
      .enter()
      .append('g')
      .attr('class', 'legend-item')
      .attr('transform', (d, i) => `translate(${radius + 20}, ${-this.data.length * 10 + i * 25})`);

    legend.append('rect').attr('width', 15).attr('height', 15).attr('fill', (d) => d.color);
    legend.append('text').attr('x', 20).attr('y', 12).text((d) => `${d.label}: ${d.value}`);
  }
}
